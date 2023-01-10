import React, { useState, useEffect } from "react";

import { DocumentReference, getDoc } from "firebase/firestore";
import { DocumentData } from "@firebase/firestore-types";

import { TTweet } from "features/tweet/tweetSlice";

import Tweet from "components/Tweet/Tweet";

type Props = {
  tweetReplies: DocumentReference<DocumentData>[];
};

const Replies = ({ tweetReplies }: Props) => {
  const [replies, setReplies] = useState<TTweet[]>([]);

  useEffect(() => {
    const fetchReplies = async () => {
      const data = [];

      for (const replyRef of tweetReplies) {
        const replyDoc = await getDoc(replyRef);

        if (replyDoc.exists()) {
          const replyData = replyDoc.data() as TTweet;
          data.push(replyData);
        }
      }

      setReplies(data);
    };

    fetchReplies();
  }, [tweetReplies]);

  return (
    <div>
      {replies.map((reply) => {
        return <Tweet tweet={reply} key={reply.id} />;
      })}
    </div>
  );
};

export default Replies;
