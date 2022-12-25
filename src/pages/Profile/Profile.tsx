import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TTweet } from "features/tweet/tweetSlice";
import { selectCurrentUser } from "../../features/user/userSlice";
import { selectTweets } from "../../features/tweet/tweetSlice";

import { useAppSelector } from "app/hooks";

import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import ProfileHeader from "components/ProfileHeader/ProfileHeader";
import UserInfo from "components/UserInfo/UserInfo";
import UserAvatar from "components/UserAvatar/UserAvatar";
import ProfileNavigation from "components/ProfileNavigation/ProfileNavigation";
import Tweets from "components/Tweets/Tweets";
import PageNotFound from "components/PageNotFound/PageNotFound";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import db from "../../firebase-config/config";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";

import { TUser } from "../../features/user/userSlice";

const Profile = () => {
  const location = useLocation();
  const [user, setUser] = useState<TUser | null>(null);
  const [activeTab, setActiveTab] = useState<string>("tweets");
  const [profileTweets, setProfileTweets] = useState<TTweet[]>([]);
  const tweets = useAppSelector(selectTweets);
  const currentUser = useAppSelector(selectCurrentUser);

  // update document title
  useEffect(() => {
    if (!user) return;

    document.title = `${user.name} (@${user.username}) / Twitter`;
  }, [user]);

  // fetch user profile based on username
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
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    };

    fetchUserProfile(pathname.slice(1));
  }, [
    location.pathname,
    currentUser?.followers,
    currentUser?.following,
    currentUser?.retweets,
  ]);

  // feetch tweets to display on profile
  useEffect(() => {
    const fetchTweets = async (replies = false, media = false) => {
      // get user tweets
      const userTweets = user?.tweets;

      const tweetsArr = [];

      if (userTweets && userTweets.length) {
        // get tweet data from tweet reference
        for (const tweetRef of userTweets) {
          const tweetDoc = await getDoc(tweetRef);
          const tweet = tweetDoc.data() as TTweet;

          if (!replies && tweet?.isReply) continue;

          if (media && !tweet.media.length) continue;

          tweetsArr.push(tweet);
        }
      }

      const userRetweets = user?.retweets;

      if (userRetweets && userRetweets.length) {
        // get tweet data from tweet reference
        for (const tweetRef of userRetweets) {
          const tweetDoc = await getDoc(tweetRef);

          if (!tweetDoc.exists()) continue;

          const tweet = tweetDoc.data() as TTweet;

          tweet.isRetweet = true;
          tweet.retweetedBy = user.username;

          if (!replies && tweet?.isReply) continue;

          if (media && !tweet.media.length) continue;

          tweetsArr.push(tweet);
        }
      }

      if (tweetsArr.length) {
        const sortedTweets = tweetsArr.sort(
          (a, b) => b.date.seconds - a.date.seconds
        );

        // set tweets
        setProfileTweets(sortedTweets);
      } else {
        setProfileTweets([]);
      }
    };

    const fetchLikedTweets = async () => {
      // get user's liked tweets
      const likedTweets = user?.likes;

      if (likedTweets && likedTweets.length) {
        const tweetsArr = [];

        // get tweet data from tweet reference
        for (const tweetRef of likedTweets) {
          const tweetDOc = await getDoc(tweetRef);
          const tweet = tweetDOc.data() as TTweet;

          tweetsArr.push(tweet);
        }

        const sortedTweets = tweetsArr.sort(
          (a, b) => b.date.seconds - a.date.seconds
        );

        // set tweets
        setProfileTweets(sortedTweets);
      } else {
        setProfileTweets([]);
      }
    };

    if (activeTab === "tweets") fetchTweets();

    if (activeTab === "replies") fetchTweets(true);

    if (activeTab === "media") fetchTweets(false, true);

    if (activeTab === "likes") fetchLikedTweets();
  }, [user?.tweets, activeTab, tweets]);

  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      {user ? (
        <div className="pb-5">
          <ProfileHeader
            name={user.name}
            tweets={user.tweets.length}
            likes={user.likes.length}
            activeTab={activeTab}
          />

          <div className="bg-white">
            {/* cover pic placeholder */}
            <div className="p-10 bg-coverPic"></div>

            <div className="bg-white">
              {/* picture and edit option */}
              <UserAvatar
                picture={user.picture}
                email={user.email}
                setUser={setUser}
              />

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
          <Tweets tweets={profileTweets} />
        </div>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <LoadingSpinner />,
});
