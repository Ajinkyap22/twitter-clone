import React from "react";

import uniquid from "uniqid";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { selectCurrentUser } from "features/user/userSlice";
import { selectTweets } from "features/tweet/tweetSlice";

import { TTweet, createTweet } from "features/tweet/tweetSlice";

import db from "firebase-config/config";
import { doc } from "firebase/firestore";

type Props = {
  show: boolean;
  setShowTweetFormModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const TweetFormModal = ({
  show,
  setShowTweetFormModal,
}: Props): JSX.Element => {
  const [tweetCaption, setTweetCaption] = useState<string>("");
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setShowTweetFormModal(false);
  };

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "inherit";
    target.style.height = `${target.scrollHeight}px`;
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTweetCaption(e.target.value);
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!currentUser) return;

    const authorRef = doc(db, "users", currentUser.email);

    const newTweet: TTweet = {
      id: uniquid(),
      text: tweetCaption,
      author: authorRef,
      media: [],
      date: new Date(),
      likes: [],
      retweets: [],
      replies: [],
      isReply: false,
      isRetweet: false,
    };

    dispatch(createTweet(newTweet));

    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose} contentClassName="border-radius-5">
      <Button
        className="rounded-pill p-1 w-10 align-self-start m-2 bg-white border-0 text-black close-hover"
        onClick={handleClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Button>

      <Modal.Body className="d-flex border-0">
        <img src={currentUser?.picture} className="rounded-pill w-7 h-7" />

        <Form.Control
          as="textarea"
          placeholder="What's happening?"
          style={{ height: "80px" }}
          className="border-0 overflow-hidden resize-none tweet-caption"
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between ">
        <div>
          <button className="me-1 cursor-pointer logo-hover p-2 border-0 bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#00acee"
              className="w-4 h-4 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </button>
          <button className="me-2 cursor-pointer logo-hover p-2 border-0 bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#00acee"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
              />
            </svg>
          </button>
        </div>
        <div>
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="rounded-pill"
            disabled={!tweetCaption.length}
          >
            Tweet
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default TweetFormModal;
