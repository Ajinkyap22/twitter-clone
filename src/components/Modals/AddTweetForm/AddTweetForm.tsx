import React from "react";

import uniquid from "uniqid";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { selectCurrentUser } from "features/user/userSlice";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { TTweet, createTweet } from "features/tweet/tweetSlice";

import db from "firebase-config/config";
import { doc } from "firebase/firestore";

const AddTweetForm = () => {
  const [tweetCaption, setTweetCaption] = useState<string>("");
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTweetCaption(e.target.value);
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "inherit";
    target.style.height = `${target.scrollHeight}px`;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

    setTweetCaption("");

    dispatch(createTweet(newTweet));
  }

  return (
    <Form
      className="p-4 d-flex flex-column border-bottom"
      onSubmit={handleSubmit}
    >
      <Form.Group
        className="mb-3 d-flex "
        controlId="exampleForm.ControlTextarea1"
      >
        <img src={currentUser?.picture} className="rounded-pill w-7 h-7" />

        <div>
          <Form.Control
            className="border-0 overflow-hidden resize-none fs-5"
            placeholder="What's happening?"
            as="textarea"
            value={tweetCaption}
            onChange={handleChange}
            cols={30}
            rows={1}
          />
        </div>
      </Form.Group>

      <div className="d-flex justify-content-between">
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

        <Button
          variant="primary"
          className="rounded-pill"
          disabled={!tweetCaption.length}
          type="submit"
        >
          Tweet
        </Button>
      </div>
    </Form>
  );
};

export default AddTweetForm;
