import React, { useState, useEffect } from "react";

import { useAppSelector } from "app/hooks";
import { selectCurrentUser } from "features/user/userSlice";

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

  useEffect(() => {
    if (!currentUser || currentUser.email === email) return;

    const currentUserRef = doc(db, "users", currentUser.email);

    const profileRef = doc(db, "users", email);

    console.log(refEqual(currentUserRef, profileRef));

    setIsFollowing(refEqual(currentUserRef, profileRef));
  }, [currentUser?.email, email]);

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;

    target.textContent = "Unfollow";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;

    target.textContent = "Following";
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
