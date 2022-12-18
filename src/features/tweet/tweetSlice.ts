import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "app/store";

export type TTweet = {
  id: number;
  text: string;
  // author: TUser;
  media: string[];
  date: Date;
  //   likes: TUser[];
  // retweets: TUser[];
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
  reducers: {},
});

// export const addTweet =
//   (tweet: TTweet): AppThunk =>
//   async (dispatach) => {};

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

export default tweetSlice.reducer;
