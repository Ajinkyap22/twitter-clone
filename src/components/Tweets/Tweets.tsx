import React from "react";
import { useAppSelector } from "app/hooks";
import { selectTweets } from "features/tweet/tweetSlice";
import TweetCard from "components/TweetCard/TweetCard";

const Tweets = () => {
  const tweets = useAppSelector(selectTweets);
  return (
    <div>
      {tweets.map((tweet) => {
        return <TweetCard key={tweet.id} tweet={tweet} />;
      })}
    </div>
  );
};

export default Tweets;
