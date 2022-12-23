import React, { useEffect } from "react";
import TweetCard from "components/TweetCard/TweetCard";
import { TTweet } from "features/tweet/tweetSlice";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { fetchTweets } from "features/tweet/tweetSlice";
import { selectCurrentUser } from "features/user/userSlice";

type Props = {
  tweets: TTweet[];
};

const Tweets = ({ tweets }: Props) => {
  const currentUser = useAppSelector(selectCurrentUser);

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
