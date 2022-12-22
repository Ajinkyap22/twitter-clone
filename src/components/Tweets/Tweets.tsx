import React from "react";
import TweetCard from "components/TweetCard/TweetCard";
import { TTweet } from "features/tweet/tweetSlice";

type Props = {
  tweets: TTweet[];
};

const Tweets = ({ tweets }: Props) => {
  return (
    <div>
      {tweets.map((tweet) => {
        if (!tweet) return null;
        return <TweetCard key={tweet.id} tweet={tweet} />;
      })}
    </div>
  );
};

export default Tweets;
