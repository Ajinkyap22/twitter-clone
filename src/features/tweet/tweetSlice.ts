import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "app/store";
import { TUser } from "features/user/userSlice";
import db from "firebase-config/config";
import { DocumentData, DocumentReference } from "firebase/firestore";
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { updateUserTweets } from "features/user/userSlice";

export type TTweet = {
  id: string;
  text: string;
  media: string[];
  author: DocumentReference<DocumentData>;
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
      state.tweets = [...state.tweets, action.payload];
    },
    updateTweets(state, action: PayloadAction<TTweet[]>) {
      state.tweets = action.payload;
    },
  },
});

// create a new tweet
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
    const userRef: DocumentReference<DocumentData> = tweet.author;

    // add tweet ref to user's tweets
    await updateDoc(userRef, {
      tweets: arrayUnion(tweetRef),
    });

    // dispatch action to add tweet to user's tweets
    dispatach(updateUserTweets(tweetRef));
  };

// fetch all tweets from user's following list including user's tweets
export const fetchTweets =
  (user: TUser): AppThunk =>
  async (dispatch) => {
    let tweets: TTweet[] = [];
    // get user's following list
    const followingList = user.following;
    // get user's tweets
    const userTweets = user.tweets;

    // fetch all tweets from user's tweets list and add to tweets array
    for (const tweetRef of userTweets) {
      const tweetDoc = await getDoc(tweetRef);
      const tweet = tweetDoc.data() as TTweet;
      tweets = [...tweets, tweet];
    }

    // fetch all tweets from user's following list and add to tweets array
    for (const userRef of followingList) {
      const userDoc = await getDoc(userRef);
      const user = userDoc.data();
      const userTweets = user?.tweets;

      if (!userTweets) return;

      userTweets.forEach(async (tweetRef: DocumentReference<DocumentData>) => {
        const tweetDoc = await getDoc(tweetRef);
        const tweet = tweetDoc.data() as TTweet;

        tweets = [...tweets, tweet];
      });
    }

    // dispatch action to add tweets to state
    dispatch(updateTweets(tweets));
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

export const { addTweet, updateTweets } = tweetSlice.actions;

export default tweetSlice.reducer;
