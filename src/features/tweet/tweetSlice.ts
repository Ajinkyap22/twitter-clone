import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "app/store";
import { TUser } from "features/user/userSlice";
import db from "firebase-config/config";
import { DocumentReference } from "firebase/firestore";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { updateUserTweets } from "features/user/userSlice";

export type TTweet = {
  id: number;
  text: string;
  // author: TUser;
  media: string[];
  author: DocumentReference<TUser>;
  date: Date;
  likes: TUser[];
  retweets: TUser[];
  replies: TTweet[];
  isReply: boolean;
  isRetweet: boolean;
};

interface TTweetState {
  tweets: TTweet[];
}

const initialState: TTweetState = {
  tweets: [],
};

export const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    addTweet: (state, action: PayloadAction<TTweet>) => {
      state.tweets.push(action.payload);
    },
  },
});

export const createTweet =
  (tweet: TTweet): AppThunk =>
  async (dispatach) => {
    // create tweet ref
    const tweetRef = doc(db, "tweets", tweet.id.toString());

    // add tweet to db
    await setDoc(tweetRef, tweet);

    // dispatch action to add tweet to state
    dispatach(addTweet(tweet));

    // get author ref from tweet
    const userRef: DocumentReference<TUser> = tweet.author;

    // add tweet ref to user's tweets
    await updateDoc(userRef, {
      tweets: arrayUnion(tweet),
    });

    // dispatch action to add tweet to user's tweets
    dispatach(updateUserTweets(tweet));
  };

// export const deleteTweet =
//   (id: number): AppThunk =>
//   async (dispatach) => {};

// export const likeTweet =
//   (id: number): AppThunk =>
//   async (dispatach) => {};

// export const retweet =
//   (id: number): AppThunk =>
//   async (dispatch) => {};

// export const reply =
//   (tweet: TTweet): AppThunk =>
//   async (dispatch) => {};

// export const bookmarkTweet =
//   (id: number): AppThunk =>
//   async (dispatch) => {};

export const selectTweets = (state: RootState) => state.tweet.tweets;

export const { addTweet } = tweetSlice.actions;

export default tweetSlice.reducer;
