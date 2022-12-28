import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import moment from "moment";

import { TTweet } from "features/tweet/tweetSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";

// import { OverlayTrigger } from "react-bootstrap";

type Props = {
  tweet: TTweet;
  name: string | undefined;
  picture: string | undefined;
  username: string | undefined;
  likes: number;
  isLiked: boolean;
  isRetweeted: boolean;
  handleTweetLike: () => void;
  handleRetweet: () => void;
  // popover: JSX.Element;
  isReply?: boolean;
  replyingTo?: string;
};

const TweetMain = ({
  name,
  username,
  picture,
  tweet,
  isLiked,
  isRetweeted,
  likes,
  handleTweetLike,
  handleRetweet,
  isReply = false,
  replyingTo = "",
}: // popover,
Props) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [retweeted, setRetweeted] = useState(isRetweeted);
  const [retweetCount, setRetweetCount] = useState(tweet.retweets.length);

  useEffect(() => {
    setLiked(isLiked);
    setLikeCount(likes);

    setRetweeted(isRetweeted);
    setRetweetCount(tweet.retweets.length);
  }, [isLiked, likes, tweet, isRetweeted]);

  const handleTweetClick = () => {
    navigate(`../${username}/status/${tweet.id}`);
  };

  return (
    <div className="d-flex flex-column p-3 pb-0">
      <div className="d-flex align-items-center">
        <Link to={`/${username}`} className="text-dark">
          <LazyLoadImage
            src={picture}
            alt="profile"
            className="w-7 h-7 rounded-pill me-3 w-13 h-13"
          />
        </Link>

        <div className="d-flex flex-column flex-grow-1">
          <Link to={`/${username}`} className="text-default">
            <div className="d-flex flex-column">
              <span className="me-2 fw-bold text-underline my-0 line-height-sm">
                {name}
              </span>
              <span className="text-search fs-7 my-0 line-height-sm">
                @{username}
              </span>
            </div>
          </Link>
        </div>

        {/* <OverlayTrigger trigger="click" placement="left" overlay={popover}>
          <button className="border-0 bg-transparent blue-hover p-2 d-flex align-items-center justify-content-center align-self-start">
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
        </OverlayTrigger> */}
      </div>

      {/* replying to */}
      {isReply && (
        <p className="mb-0 mt-3">
          <span className="text-search fs-7">Replying to</span>
          <Link
            to={`/${replyingTo}`}
            className="link-primary fs-7 text-underline text-decoration-none"
          >
            {" "}
            @{replyingTo}'s
          </Link>
          <Link
            to={`/${replyingTo}/status/${tweet.originalTweet}`}
            className="link-primary fs-7 text-underline text-decoration-none"
          >
            {" "}
            Tweet
          </Link>
        </p>
      )}

      <div className="pt-2">
        <p
          onClick={handleTweetClick}
          className="mb-2 fs-4_5 line-height-lg pre-wrap"
        >
          {tweet.text}
        </p>

        {/* Display images and videos from media array */}
        {tweet.media.length > 0 &&
          (tweet.media[0].includes("images") ? (
            <LazyLoadImage
              src={tweet.media[0]}
              alt="tweet-image"
              className="rounded-4 w-100 border border-1 mt-1"
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

        {/* time */}
        <p className="text-search fs-7 py-3 mb-0 border-bottom border-col">
          {moment(tweet.date.toDate()).format("h:mm A - MMM D, YYYY")}
        </p>

        {/* tweet stats */}
        <div className="d-flex py-3 border-bottom border-col align-items-center">
          {/* retweets */}
          <p className="fs-7_5 me-3 my-0">
            <span className="fw-bold">{tweet.retweets.length}</span>{" "}
            <span className="text-search">
              {tweet.retweets.length === 1 ? "Retweet" : "Retweets"}
            </span>
          </p>

          {/* likes */}
          <p className="fs-7_5 me-3 my-0">
            <span className="fw-bold">{likeCount}</span>{" "}
            <span className="text-search">
              {likeCount === 1 ? "Like" : "Likes"}
            </span>
          </p>
        </div>

        <div className="d-flex justify-content-around py-2 border-bottom border-col">
          {/* reply */}
          <button className="border-0 bg-transparent blue-hover p-2 d-flex align-items-center justify-content-center text-search">
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
          <div className="d-flex">
            <button
              onClick={handleRetweet}
              className="border-0 bg-transparent retweet p-2 d-flex align-items-center justify-content-center text-search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-3 h-3 ${retweeted ? "bg-green" : ""}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                />
              </svg>
            </button>

            {retweetCount > 0 && (
              <span
                className={`ms-1 align-self-center ${
                  retweeted ? "bg-green" : ""
                }`}
              >
                {retweetCount}
              </span>
            )}
          </div>

          {/* like */}
          <div className="d-flex">
            <button
              className={`border-0 bg-transparent like p-2 d-flex align-items-center justify-content-center text-search ${
                liked ? "liked" : ""
              }`}
              onClick={handleTweetLike}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={liked ? "red" : "none"}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={liked ? "#f9197f" : "currentColor"}
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
            {likeCount > 0 && (
              <span
                className={`ms-1 align-self-center ${liked ? "bg-red" : ""}`}
              >
                {likeCount}
              </span>
            )}
          </div>

          {/* share */}
          <button className="border-0 bg-transparent blue-hover p-2 d-flex align-items-center justify-content-center text-search">
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
    </div>
  );
};

export default TweetMain;
