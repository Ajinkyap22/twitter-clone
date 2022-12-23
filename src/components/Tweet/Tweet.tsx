import React, { useState, useEffect } from "react";

import {
  likeTweet,
  unlikeTweet,
  TTweet,
  deleteTweet,
  retweet,
  unretweet,
} from "features/tweet/tweetSlice";
import {
  selectCurrentUser,
  TUser,
  bookmarkTweet,
  unbookmarkTweet,
  follow,
  unfollow,
} from "features/user/userSlice";
import { useAppSelector, useAppDispatch } from "app/hooks";

import { getDoc, doc, DocumentReference, refEqual } from "firebase/firestore";
import db from "firebase-config/config";

import { Button } from "react-bootstrap";
import { Popover } from "react-bootstrap";

import TweetCard from "components/TweetCard/TweetCard";
import TweetMain from "components/TweetMain/TweetMain";

type TweetProps = {
  tweet: TTweet;
  isCard?: boolean;
};

const Tweet = ({ tweet, isCard = true }: TweetProps): JSX.Element => {
  const [name, setName] = useState<string>();
  const [picture, setPicture] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isRetweeted, setIsRetweeted] = useState<boolean>(false);

  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentUser || currentUser.email === email || !email) return;

    // Get profile ref
    const profileRef = doc(db, "users", email);

    setIsFollowing(
      currentUser.following.some((ref) => refEqual(ref, profileRef))
    );
  }, [currentUser?.email, email]);

  useEffect(() => {
    // fetch author
    const fetchAuthor = async () => {
      //Get Author ref from tweet
      const authRef = tweet.author;

      //getDoc from authRef
      const authorDoc = await getDoc(authRef);

      //get the author from the authorDoc
      const author = authorDoc.data() as TUser;

      // set the author states
      setName(author.name);
      setPicture(author.picture);
      setUsername(author.username);
      setLikes(tweet.likes.length);
      setEmail(author.email);
    };

    fetchAuthor();

    // check if the current user liked the tweet
    if (currentUser) {
      const userRef: DocumentReference = doc(db, "users", currentUser.email);
      const tweetRef: DocumentReference = doc(db, "tweets", tweet.id);

      const isUserInLikes = tweet.likes.some((like) => {
        const likeRef: DocumentReference = like;
        return refEqual(likeRef, userRef);
      });

      const isTweetInBookmarks = currentUser.bookmarks.some((bookmark) => {
        const bookmarkRef: DocumentReference = bookmark;
        return refEqual(bookmarkRef, tweetRef);
      });

      const isTweetInRetweets = currentUser.retweets.some((retweet) => {
        const retweetRef: DocumentReference = retweet;
        return refEqual(retweetRef, tweetRef);
      });

      if (isTweetInRetweets) {
        setIsRetweeted(true);
      } else {
        setIsRetweeted(false);
      }

      if (isUserInLikes) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }

      if (isTweetInBookmarks) {
        setIsBookmarked(true);
      } else {
        setIsBookmarked(false);
      }

      if (refEqual(tweet.author, userRef)) {
        setIsAuthor(true);
      } else {
        setIsAuthor(false);
      }
    }
  }, [tweet]);

  const handleTweetLike = () => {
    if (currentUser) {
      if (isLiked) {
        dispatch(unlikeTweet(tweet.id, currentUser.email));
      } else {
        dispatch(likeTweet(tweet.id, currentUser.email));
      }
    }
  };

  const handleDeleteTweet = () => {
    if (currentUser) {
      dispatch(deleteTweet(tweet.id, currentUser.email));
    }
  };

  const handleTweetBookmark = () => {
    if (currentUser) {
      if (isBookmarked) {
        dispatch(unbookmarkTweet(tweet.id, currentUser.email));
      } else {
        dispatch(bookmarkTweet(tweet.id, currentUser.email));
      }
    }
  };

  const handleRetweet = () => {
    if (currentUser) {
      if (isRetweeted) {
        dispatch(unretweet(tweet.id, currentUser?.email));
      } else {
        dispatch(retweet(tweet.id, currentUser?.email));
      }
    }
  };

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stop the page from redirecting to the user's profile
    e.preventDefault();

    if (!currentUser || !email) return;

    setIsFollowing(true);

    dispatch(follow(email, currentUser?.email));
  };

  const handleUnfollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!currentUser || !email) return;

    setIsFollowing(false);

    dispatch(unfollow(email, currentUser?.email));
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body className="p-0 d-flex flex-column">
        {/* delete */}
        {currentUser && isAuthor ? (
          <Button
            variant="light"
            className="fw-bold fs-7 p-2 py-2_5  text-break background-transparent w-100 text-start py-2 px-3 bg-white border-0 user-hover"
            onClick={handleDeleteTweet}
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
        ) : null}

        {/* Follow */}
        {(currentUser?.email !== email || !email) &&
          (isFollowing ? (
            <Button
              variant="light"
              onClick={handleUnfollow}
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
              Unfollow @{username}
            </Button>
          ) : (
            <Button
              variant="light"
              onClick={handleFollow}
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
          ))}

        {/* bookmark */}
        <Button
          variant="light"
          className="fw-bold fs-7 p-2 py-2_5 text-break background-transparent w-100 text-start py-2 px-3 bg-white border-0 user-hover"
          onClick={handleTweetBookmark}
        >
          {isBookmarked ? (
            <>
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
                  d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5"
                />
              </svg>
              Remove Bookmark
            </>
          ) : (
            <>
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
              Add Bookmark
            </>
          )}
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      {isCard ? (
        <TweetCard
          tweet={tweet}
          name={name}
          picture={picture}
          username={username}
          isLiked={isLiked}
          likes={likes}
          handleTweetLike={handleTweetLike}
          popover={popover}
          handleRetweet={handleRetweet}
          isRetweeted={isRetweeted}
        />
      ) : (
        <TweetMain
          tweet={tweet}
          name={name}
          picture={picture}
          username={username}
          isLiked={isLiked}
          likes={likes}
          handleTweetLike={handleTweetLike}
          popover={popover}
        />
      )}
    </>
  );
};

export default Tweet;
