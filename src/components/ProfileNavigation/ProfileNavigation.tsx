import React from "react";

import { Button } from "react-bootstrap";

type Props = {
  activeTab: string;
  handleClick: (tab: string) => void;
};

const ProfileNavigation = ({ activeTab, handleClick }: Props) => {
  return (
    <div className="d-flex align-items-center border-bottom border-col justify-content-around text-default">
      {/* tweet */}
      <Button
        onClick={() => handleClick("tweets")}
        variant="light"
        className="bg-body-primary border-0 btn-sm fs-7 p-3 hover-square rounded-0 flex-grow-1"
      >
        <span
          className={`py-3 ${
            activeTab === "tweets"
              ? "fw-bold text-default border-active"
              : "text-search fw-medium border-0"
          }`}
        >
          Tweets
        </span>
      </Button>

      {/* tweets and replies */}
      <Button
        onClick={() => handleClick("replies")}
        variant="light"
        className="bg-body-primary border-0 btn-sm fs-7 p-3 hover-square rounded-0 flex-grow-1"
      >
        <span
          className={`py-3 ${
            activeTab === "replies"
              ? "fw-bold text-default border-active"
              : "text-search fw-medium border-0"
          }`}
        >
          Tweets and Replies
        </span>
      </Button>

      {/* media */}
      <Button
        onClick={() => handleClick("media")}
        variant="light"
        className="bg-body-primary border-0 btn-sm fs-7 p-3 hover-square rounded-0 flex-grow-1"
      >
        <span
          className={`py-3 ${
            activeTab === "media"
              ? "fw-bold text-default border-active"
              : "text-search fw-medium border-0"
          }`}
        >
          Media
        </span>
      </Button>

      {/* likes */}
      <Button
        onClick={() => handleClick("likes")}
        variant="light"
        className="bg-body-primary border-0 btn-sm fs-7 p-3 hover-square rounded-0 flex-grow-1"
      >
        <span
          className={`py-3 ${
            activeTab === "likes"
              ? "fw-bold text-default border-active"
              : "text-search fw-medium border-0"
          }`}
        >
          Likes
        </span>
      </Button>
    </div>
  );
};

export default ProfileNavigation;
