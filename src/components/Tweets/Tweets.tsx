import React from "react";
import Tweet from "components/Tweet/Tweet";
import { TTweet } from "features/tweet/tweetSlice";

type Props = {
  tweets: TTweet[];
};

const Tweets = ({ tweets }: Props) => {
  return (
    <div>
      {tweets.map((tweet) => {
        if (!tweet) return null;
        return <Tweet key={tweet.id} tweet={tweet} />;
      })}
    </div>
  );
};

export default Tweets;
