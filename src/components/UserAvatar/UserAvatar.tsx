import React, { useState, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "app/hooks";
import { selectCurrentUser, follow, unfollow } from "features/user/userSlice";

import db from "../../firebase-config/config";
import { refEqual, doc } from "firebase/firestore";

import Button from "react-bootstrap/Button";

type Props = {
  picture: string;
  email: string;
};

const UserAvatar = ({ picture, email }: Props) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentUser || currentUser.email === email) return;

    const profileRef = doc(db, "users", email);

    setIsFollowing(
      currentUser.following.some((ref) => refEqual(ref, profileRef))
    );
  }, [currentUser?.email, email]);

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;

    target.textContent = "Unfollow";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;

    target.textContent = "Following";
  };

  const handleFollow = () => {
    if (!currentUser) return;

    setIsFollowing(true);

    dispatch(follow(email, currentUser?.email));
  };

  const handleUnfollow = () => {
    if (!currentUser) return;

    setIsFollowing(false);

    dispatch(unfollow(email, currentUser?.email));
  };

  return (
    <div className="d-flex justify-content-between align-items-start">
      {/* profile picture */}
      <img
        className="w-34 h-34 rounded-circle border-avatar object-center -mt-16 ms-3"
        src={picture}
        alt="profile pic"
      />

      {/* edit profile button */}
      {email === currentUser?.email && (
        <Button
          variant="light"
          className="bg-white border border btn-sm me-3 rounded-pill mt-3 fs-7 fw-bold py-1 px-3 hover-gray"
        >
          Edit Profile
        </Button>
      )}

      {/* follow button */}
      {email !== currentUser?.email && !isFollowing && (
        <Button
          onClick={handleFollow}
          variant="dark"
          className="border border bg-dark text-white btn-sm me-3 rounded-pill mt-3 fs-7 fw-bold py-1 px-3"
        >
          Follow
        </Button>
      )}

      {/* following button */}
      {email !== currentUser?.email && isFollowing && (
        <Button
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          onClick={handleUnfollow}
          variant="light"
          className="bg-white border border btn-sm me-3 rounded-pill mt-3 fs-7 fw-bold py-1 px-3 hover-danger"
        >
          Following
        </Button>
      )}
    </div>
  );
};

export default UserAvatar;
