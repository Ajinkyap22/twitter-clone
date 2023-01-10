import React, { useState, useEffect } from "react";

import TweetCard from "components/TweetCard/TweetCard";

import { getDoc } from "firebase/firestore";

import { TTweet } from "features/tweet/tweetSlice";
import { TUser } from "features/user/userSlice";

type Props = {
  reply: TTweet;
};

const Reply = ({ reply }: Props) => {
  const [author, setAuthor] = useState<TUser | null>(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      const authorDoc = await getDoc(reply.author);

      if (authorDoc.exists()) {
        const authorData = authorDoc.data() as TUser;

        setAuthor(authorData);
      }
    };

    fetchAuthor();
  }, [reply]);

  return (
    <div>
      <TweetCard
        name={author?.name}
        username={author?.username}
        picture={author?.picture}
        tweet={reply}
        isLiked={false}
        likes={0}
        handleTweetLike={() => {
          return null;
        }}
        handleRetweet={() => {
          return null;
        }}
        popover={<></>}
        isRetweeted={false}
        isReply={true}
        replyingTo={reply.replyTo}
      />
    </div>
  );
};

export default Reply;
