import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector } from "app/hooks";

import TweetHeader from "components/TweetHeader/TweetHeader";
import Tweet from "components/Tweet/Tweet";
import ReplyForm from "components/ReplyForm/ReplyForm";
import Replies from "components/Replies/Replies";
import PageNotFound from "components/PageNotFound/PageNotFound";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

import { TTweet } from "features/tweet/tweetSlice";
import { TUser, selectCurrentUser } from "features/user/userSlice";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import db from "firebase-config/config";
import { doc, getDoc } from "firebase/firestore";

const TweetPage = () => {
  const [tweet, setTweet] = useState<TTweet | null>(null);
  const [author, setAuthor] = useState<TUser | null>(null);
  const [tweetFound, setTweetFound] = useState<boolean>(true);

  const currentUser = useAppSelector(selectCurrentUser);
  const { tweetId } = useParams();

  useEffect(() => {
    if (!tweet || !author) return;

    document.title = `${author.name} on Twitter: "${tweet?.text}"`;
  }, [tweet, author]);

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
      } else {
        setTweetFound(false);
      }
    };

    getTweet();
  }, [tweetId, currentUser]);

  return (
    <>
      {tweetFound ? (
        <main className="pb-5">
          {/* header */}
          <TweetHeader />

          {/* main tweet */}
          {tweet && <Tweet tweet={tweet} isCard={false} />}

          {/* reply form */}
          {tweet && author && (
            <ReplyForm replyingTo={author?.username} tweetId={tweetId} />
          )}

          {/* replies */}
          {tweet && <Replies tweetReplies={tweet.replies} />}
        </main>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default withAuthenticationRequired(TweetPage, {
  onRedirecting: () => <LoadingSpinner />,
});
