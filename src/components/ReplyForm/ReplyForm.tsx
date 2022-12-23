import React, { useRef, useState } from "react";
import { useAppSelector } from "app/hooks";
import { selectCurrentUser } from "features/user/userSlice";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

type Props = {
  replyingTo: string;
  tweetId: string | undefined;
};

const ReplyForm = ({ replyingTo }: Props) => {
  const user = useAppSelector(selectCurrentUser);
  const [caption, setCaption] = useState<string>("");
  const captionRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);

    const target = e.target as HTMLTextAreaElement;
    target.style.height = "inherit";
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <div className="border-bottom d-flex flex-column p-2 px-3">
      {/* replying to */}
      <p className="fs-7">
        <span className="text-search ms-6 mb-1">Replying to</span>
        <Link to={`/profile/${replyingTo}`} className="ms-1 link-primary">
          @{replyingTo}
        </Link>
      </p>

      {/* right side */}
      <div className="d-flex">
        {/* image */}
        <img
          src={user?.picture}
          alt="profile"
          className="w-10 h-10 rounded-pill me-3"
        />

        <div className="flex-grow-1">
          {/* caption */}
          <Form.Control
            as="textarea"
            placeholder="Tweet your reply"
            rows={1}
            className="border-0 overflow-hidden resize-none tweet-caption py-1 pb-4 px-0"
            value={caption}
            onChange={handleChange}
            ref={captionRef}
          />

          {/* buttons */}
          <div className="d-flex justify-content-between align-items-center">
            <div>
              {/* images */}
              <Button
                //   onClick={handleImageUpload}
                //   disabled={imageInput || videoInput ? true : false}
                className="me-1 cursor-pointer logo-hover p-2 px-0 border-0 bg-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#00acee"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </Button>

              {/* videos */}
              <Button
                //   onClick={handleVideoUpload}
                //   disabled={imageInput || videoInput ? true : false}
                className="me-2 cursor-pointer logo-hover p-2 border-0 bg-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#00acee"
                  className="w-3 h-3"
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
              </Button>

              {/* hidden image input */}
              <input
                type="file"
                accept="image/*"
                //   onChange={handleImageInput}
                //   ref={imageInputRef}
                //   disabled={!!videoInput}
                hidden
              />

              {/* hidden video input */}
              <input
                type="file"
                accept="video/*"
                //   onChange={handleVideoInput}
                //   ref={videoInputRef}
                //   disabled={!!imageInput}
                hidden
              />
            </div>
            <div>
              {caption.length >= 280 && (
                <span className="text-danger me-3 border border-danger border-2 rounded-4 p-1_5 fs-8">
                  {280 - caption.length}
                </span>
              )}

              <Button
                variant="primary"
                className="rounded-pill py-1_5 px-3"
                disabled={!caption.length || caption.length > 280}
                type="submit"
              >
                Reply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyForm;
