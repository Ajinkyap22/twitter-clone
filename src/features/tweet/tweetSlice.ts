import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface ITweet {
  id: number;
  text: string;
  // author: IUser;
  media: string[];
  date: Date;
  //   likes: IUser[];
  // retweets: IUser[];
  replies: ITweet[];
  isReply: boolean;
  isRetweet: boolean;
}

interface ITweetState {
  tweets: ITweet[];
}

const initialState: ITweetState = {
  tweets: [],
};

export const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {},
});

export const addTweet =
  (tweet: ITweet): AppThunk =>
  async (dispatach) => {};

export const deleteTweet =
  (id: number): AppThunk =>
  async (dispatach) => {};

export const likeTweet =
  (id: number): AppThunk =>
  async (dispatach) => {};

export const retweet =
  (id: number): AppThunk =>
  async (dispatch) => {};

export const reply =
  (tweet: ITweet): AppThunk =>
  async (dispatch) => {};

export const bookmarkTweet =
  (id: number): AppThunk =>
  async (dispatch) => {};

export const selectTweets = (state: RootState) => state.tweet.tweets;

export default tweetSlice.reducer;
