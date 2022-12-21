import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import ProfileHeader from "components/ProfileHeader/ProfileHeader";
import UserInfo from "components/UserInfo/UserInfo";
import UserAvatar from "components/UserAvatar/UserAvatar";
import ProfileNavigation from "components/ProfileNavigation/ProfileNavigation";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import db from "../../firebase-config/config";
import { collection, getDocs, query, where } from "firebase/firestore";

import { TUser } from "../../features/user/userSlice";

const Profile = () => {
  const location = useLocation();
  const [user, setUser] = useState<TUser | null>(null);
  const [activeTab, setActiveTab] = useState<string>("tweets");

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

  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      {user && (
        <>
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
        </>
      )}
    </>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <LoadingSpinner />,
});
