import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TweetHeader from "components/TweetHeader/TweetHeader";
import Tweet from "components/Tweet/Tweet";
import ReplyForm from "components/ReplyForm/ReplyForm";

import { TTweet } from "features/tweet/tweetSlice";
import { TUser } from "features/user/userSlice";

import db from "firebase-config/config";

import { doc, getDoc } from "firebase/firestore";

const TweetPage = () => {
  const [tweet, setTweet] = useState<TTweet | null>(null);
  const [author, setAuthor] = useState<TUser | null>(null);
  const { tweetId } = useParams();

  useEffect(() => {
    if (!tweetId) return;

    const getTweet = async () => {
      const tweetRef = doc(db, "tweets", tweetId);

      const tweetDoc = await getDoc(tweetRef);

      if (tweetDoc.exists()) {
        const tweetData = tweetDoc.data() as TTweet;
        setTweet(tweetData);

        const authorRef = tweetData.author;

        const authorDoc = await getDoc(authorRef);

        if (authorDoc.exists()) {
          const authorData = authorDoc.data() as TUser;
          setAuthor(authorData);
        }
      }
    };

    getTweet();
  }, [tweetId]);

  return (
    <main className="pb-5">
      {/* header */}
      <TweetHeader />

      {/* main tweet */}
      {tweet && <Tweet tweet={tweet} isCard={false} />}

      {/* reply form */}
      {tweet && author && (
        <ReplyForm replyingTo={author?.username} tweetId={tweetId} />
      )}
    </main>
  );
};

export default TweetPage;