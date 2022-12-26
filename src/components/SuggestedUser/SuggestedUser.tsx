import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectCurrentUser, follow, unfollow } from "features/user/userSlice";

import db from "../../firebase-config/config";
import { refEqual, doc } from "firebase/firestore";

import { Button } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";

type Props = {
  user: {
    name: string;
    username: string;
    picture: string;
    email: string;
    isVerified: boolean;
  };
};

const SuggestedUser = ({ user }: Props) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentUser || currentUser.email === user.email) return;

    const profileRef = doc(db, "users", user.email);

    setIsFollowing(
      currentUser.following.some((ref) => refEqual(ref, profileRef))
    );
  }, [currentUser?.email, user.email, currentUser?.following]);

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;

    target.textContent = "Unfollow";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;

    target.textContent = "Following";
  };

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stop the page from redirecting to the user's profile
    e.preventDefault();

    if (!currentUser) return;

    setIsFollowing(true);

    dispatch(follow(user.email, currentUser?.email));
  };

  const handleUnfollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!currentUser) return;

    setIsFollowing(false);

    dispatch(unfollow(user.email, currentUser?.email));
  };

  return (
    <Link to={`/${user.username}`} className="link">
      <div className="d-flex justify-content-between p-3 user-hover cursor-pointer text-decoration-none">
        <div className="d-flex">
          <LazyLoadImage
            src={user.picture}
            alt="user"
            className="w-8 h-8 rounded-pill w-13 h-13"
          />
          <div className="d-flex flex-column ms-3 justify-content-center">
            <div className="d-flex align-items-center">
              {/* name */}
              <h6 className="mb-0 text-underline word-break">
                {user.name.length >= 20
                  ? user.name.slice(0, 17) + "..."
                  : user.name}
              </h6>

              {/* verified tick */}
              {user.isVerified && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#188cd8 "
                  className="ms-1 w-2_5 h-2_5"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                </svg>
              )}
            </div>

            {/* username */}
            <span className="text-muted word-break">
              @
              {user.username.length >= 18
                ? user.username.slice(0, 15) + "..."
                : user.username}
            </span>
          </div>
        </div>

        {isFollowing ? (
          <Button
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            onClick={handleUnfollow}
            variant="light"
            className="bg-white rounded-pill fw-bold fs-7_5 cursor-pointer py-1 ms-3 border border align-self-center hover-danger"
          >
            Following
          </Button>
        ) : (
          <Button
            onClick={handleFollow}
            variant="dark"
            className="bg-dark rounded-pill text-white fw-bold fs-9 cursor-pointer py-1 ms-3 align-self-center"
          >
            Follow
          </Button>
        )}
      </div>
    </Link>
  );
};

export default SuggestedUser;
