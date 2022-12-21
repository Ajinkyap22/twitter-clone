import React from "react";

import Button from "react-bootstrap/Button";

type Props = {
  activeTab: string;
  handleClick: (tab: string) => void;
};

const ProfileNavigation = ({ activeTab, handleClick }: Props) => {
  return (
    <div className="d-flex align-items-center border-bottom justify-content-around">
      {/* tweet */}
      <Button
        onClick={() => handleClick("tweets")}
        variant="light"
        className="bg-white border-0 btn-sm fs-7 p-3 hover-gray-square rounded-0 flex-grow-1"
      >
        <span
          className={`py-3 ${
            activeTab === "tweets"
              ? "fw-bold border-active"
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
        className="bg-white border-0 btn-sm fs-7 p-3 hover-gray-square rounded-0 flex-grow-1"
      >
        <span
          className={`py-3 ${
            activeTab === "replies"
              ? "fw-bold border-active"
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
        className="bg-white border-0 btn-sm fs-7 p-3 hover-gray-square rounded-0 flex-grow-1"
      >
        <span
          className={`py-3 ${
            activeTab === "media"
              ? "fw-bold border-active"
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
        className="bg-white border-0 btn-sm fs-7 p-3 hover-gray-square rounded-0 flex-grow-1"
      >
        <span
          className={`py-3 ${
            activeTab === "likes"
              ? "fw-bold border-active"
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
