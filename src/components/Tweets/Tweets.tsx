import React from "react";

import Tweet from "components/Tweet/Tweet";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

import { TTweet, fetchMoreTweets } from "features/tweet/tweetSlice";
import { useAppDispatch } from "app/hooks";

type Props = {
  tweets: TTweet[];
  allTweetsCount?: number;
  isProfile?: boolean;
  isBookmarks?: boolean;
};

const Tweets = ({
  tweets,
  allTweetsCount,
  isProfile = false,
  isBookmarks = false,
}: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <InfiniteScroll
        dataLength={tweets.length}
        next={() => dispatch(fetchMoreTweets())}
        hasMore={
          !isProfile &&
          !isBookmarks &&
          tweets.length < (allTweetsCount || Infinity)
        }
        loader={<LoadingSpinner />}
      >
        {tweets.map((tweet, i) => tweet && <Tweet key={i} tweet={tweet} />)}
      </InfiniteScroll>
    </div>
  );
};

export default Tweets;
