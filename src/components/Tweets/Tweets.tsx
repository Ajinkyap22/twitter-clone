import React from "react";
import Tweet from "components/Tweet/Tweet";
import { TTweet } from "features/tweet/tweetSlice";

type Props = {
  tweets: TTweet[];
};

const Tweets = ({ tweets }: Props) => {
  return (
    <div>
      {tweets.map((tweet, i) => {
        if (!tweet) return null;
        return <Tweet key={i} tweet={tweet} />;
      })}
    </div>
  );
};

export default Tweets;
