import React, { useContext } from "react";
import { useAppSelector } from "app/hooks";
import { selectTweets, selectAllTweets } from "features/tweet/tweetSlice";
import { ThemeContext } from "contexts/ThemeContext";

import AddTweetForm from "components/AddTweetForm/AddTweetForm";
import Tweets from "components/Tweets/Tweets";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

import { withAuthenticationRequired } from "@auth0/auth0-react";

const FeedContent = () => {
  const tweets = useAppSelector(selectTweets);
  const allTweets = useAppSelector(selectAllTweets);
  const { theme, setTheme } = useContext(ThemeContext);
  const toggleTheme = () => {
    if (theme === "light-theme") {
      setTheme("dark-theme");
    } else {
      setTheme("light-theme");
    }
  };

  return (
    <>
      <div className="position-sticky top-0 p-3 py-2 pe-1 bg-body-primary-transparent d-flex justify-content-between align-items-center z-10">
        <h5 className="fw-bold m-0">Home</h5>

        <button
          className={`bg-transparent border-0 rounded-circle p-1_5 ${
            theme === "light-theme" ? "hover-gray" : "link-hover"
          }`}
          onClick={toggleTheme}
        >
          {theme === "light-theme" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#89C4E1"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="w-3 h-3 fill"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* tweet form */}
      <AddTweetForm isModal={false} />

      {/* tweets feed */}
      <Tweets tweets={tweets} allTweetsCount={allTweets.length} />
    </>
  );
};

export default withAuthenticationRequired(FeedContent, {
  onRedirecting: () => <LoadingSpinner />,
});
