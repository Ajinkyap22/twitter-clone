import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { likeTweet, unlikeTweet, TTweet } from "features/tweet/tweetSlice";
import { selectCurrentUser, TUser } from "features/user/userSlice";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { getDoc, doc, DocumentReference, refEqual } from "firebase/firestore";
import db from "firebase-config/config";

type TweetCardProps = {
  tweet: TTweet;
};

const TweetCard = ({ tweet }: TweetCardProps): JSX.Element => {
  const [name, setName] = useState<string>();
  const [picture, setPicture] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // fetch author
    const fetchAuthor = async () => {
      //Get Author ref from tweet
      const authRef = tweet.author;

      //getDoc from authRef
      const authorDoc = await getDoc(authRef);

      //get the author from the authorDoc
      const author = authorDoc.data() as TUser;

      //set the author states
      setName(author.name);
      setPicture(author.picture);
      setUsername(author.username);
      setLikes(tweet.likes.length);
    };

    fetchAuthor();

    // check if the current user liked the tweet
    if (currentUser) {
      const userRef: DocumentReference = doc(db, "users", currentUser.email);

      const isUserInLikes = tweet.likes.some((like) => {
        const likeRef: DocumentReference = like;
        return refEqual(likeRef, userRef);
      });

      if (isUserInLikes) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }, [tweet]);

  useEffect(() => {
    console.log(isLiked);
  }, [isLiked]);

  const handleTweetLike = () => {
    if (currentUser) {
      if (isLiked) {
        dispatch(unlikeTweet(tweet.id, currentUser.email, isLiked));
      } else {
        dispatch(likeTweet(tweet.id, currentUser.email, isLiked));
      }
    }
  };
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body className="p-0 d-flex flex-column">
        <Button
          variant="light"
          className="fw-bold fs-7 p-2 py-2_5  text-break background-transparent w-100 text-start py-2 px-3 bg-white border-0 user-hover"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 me-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          Delete Tweet
        </Button>
        <Button
          variant="light"
          className="fw-bold fs-7 p-2 py-2_5  text-break background-transparent w-100 text-start py-2 px-3  bg-white border-0 user-hover"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 me-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>
          Follow @{username}
        </Button>
        <Button
          variant="light"
          className="fw-bold fs-7 p-2 py-2_5  text-break background-transparent w-100 text-start py-2 px-3  bg-white border-0 user-hover"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 me-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
          Bookmark Tweet
        </Button>
      </Popover.Body>
    </Popover>
  );
  return (
    <div className="d-flex justify-content-between align-items-start border-bottom p-3 pb-0 cursor-pointer tweet">
      <img src={picture} alt="profile" className="w-7 h-7 rounded-pill me-3" />

      <div className="d-flex flex-column flex-grow-1">
        <div>
          <span className="me-2 fw-bold text-underline">{name}</span>
          <span className="text-muted">@{username}</span>
        </div>

        <p className="mb-2 tweet-text">{tweet.text}</p>

        {/* Display images and videos from media array */}
        {tweet.media.length > 0 &&
          (tweet.media[0].includes("images") ? (
            <img
              src={tweet.media[0]}
              alt="tweet-image"
              className="rounded-4 w-100 border border-1"
            />
          ) : (
            <video
              src={tweet.media[0]}
              className="w-100 h-100 rounded-3"
              controls
              muted
              loop
              autoPlay
            />
          ))}

        <div className="d-flex justify-content-between p-1">
          {/* reply */}
          <button className="border-0 bg-transparent blue-hover p-2 d-flex align-items-center justify-content-center text-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
              />
            </svg>
          </button>

          {/* retweet */}
          <button className="border-0 bg-transparent retweet p-2 d-flex align-items-center justify-content-center text-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
              />
            </svg>
          </button>

          {/* like */}
          <div className="d-flex ">
            <button
              className={`border-0 bg-transparent like p-2 d-flex align-items-center justify-content-center text-muted ${
                isLiked ? "liked" : ""
              }`}
              onClick={handleTweetLike}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isLiked ? "red" : "none"}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={isLiked ? "#f9197f" : "currentColor"}
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
            {tweet.likes.length > 0 && (
              <span
                className={`ms-1 align-self-center ${isLiked ? "bg-red" : ""}`}
              >
                {likes}
              </span>
            )}
          </div>

          {/* share */}
          <button className="border-0 bg-transparent blue-hover p-2 d-flex align-items-center justify-content-center text-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          </button>
        </div>
      </div>

      <OverlayTrigger trigger="click" placement="left" overlay={popover}>
        <button className="border-0 bg-transparent blue-hover p-2 d-flex align-items-center justify-content-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </button>
      </OverlayTrigger>
    </div>
  );
};

export default TweetCard;
