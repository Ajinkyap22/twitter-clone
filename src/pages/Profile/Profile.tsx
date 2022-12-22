import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TTweet } from "features/tweet/tweetSlice";

import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import ProfileHeader from "components/ProfileHeader/ProfileHeader";
import UserInfo from "components/UserInfo/UserInfo";
import UserAvatar from "components/UserAvatar/UserAvatar";
import ProfileNavigation from "components/ProfileNavigation/ProfileNavigation";
import Tweets from "components/Tweets/Tweets";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import db from "../../firebase-config/config";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";

import { TUser } from "../../features/user/userSlice";

const Profile = () => {
  const location = useLocation();
  const [user, setUser] = useState<TUser | null>(null);
  const [activeTab, setActiveTab] = useState<string>("tweets");
  const [tweets, setTweets] = useState<TTweet[]>([]);

  useEffect(() => {
    if (!user) return;

    document.title = `${user.name} (@${user.username}) / Twitter`;
  }, [user]);

  useEffect(() => {
    const { pathname } = location;

    const fetchUserProfile = async (username: string) => {
      // get users collection reference
      const usersRef = collection(db, "users");

      // query users collection for user with matching username
      const q = query(usersRef, where("username", "==", username));

      // get query snapshot
      const querySnapshot = await getDocs(q);

      let user: TUser | null = null;

      querySnapshot.forEach((doc) => {
        user = doc.data() as TUser;
      });

      setUser(user);
    };

    fetchUserProfile(pathname.slice(1));
  }, [location.pathname]);

  useEffect(() => {
    const fetchTweets = async () => {
      // get user tweets
      const userTweets = user?.tweets;

      if (userTweets && userTweets.length) {
        const tweetsArr = [];

        // get tweet data from tweet reference
        for (const tweetRef of userTweets) {
          const tweetDOc = await getDoc(tweetRef);
          const tweet = tweetDOc.data() as TTweet;

          tweetsArr.push(tweet);
        }

        const sortedTweets = tweetsArr.sort(
          (a, b) => b.date.seconds - a.date.seconds
        );

        // set tweets
        setTweets(sortedTweets);
      }
    };

    fetchTweets();
  }, [user?.tweets]);

  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      {user && (
        <div className="pb-5">
          <ProfileHeader name={user.name} tweets={user.tweets.length} />

          <div className="bg-white">
            {/* cover pic placeholder */}
            <div className="p-10 bg-coverPic"></div>

            <div className="bg-white">
              {/* picture and edit option */}
              <UserAvatar picture={user.picture} />

              {/* user info */}
              <UserInfo user={user} />

              {/* menu - tweets, tweets and replies, media, likes */}
              <ProfileNavigation
                activeTab={activeTab}
                handleClick={handleClick}
              />
            </div>
          </div>

          {/* tweets */}
          <Tweets tweets={tweets} />
        </div>
      )}
    </>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <LoadingSpinner />,
});
