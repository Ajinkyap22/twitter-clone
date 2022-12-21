import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "app/store";
import { TUser } from "features/user/userSlice";
import db from "firebase-config/config";
import {
  DocumentData,
  DocumentReference,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDoc,
  Timestamp,
  arrayRemove,
} from "firebase/firestore";
import { updateUserTweets, updateUserLikes } from "features/user/userSlice";

export type TTweet = {
  id: string;
  text: string;
  media: string[];
  author: DocumentReference<DocumentData>;
  date: Timestamp;
  likes: DocumentReference<DocumentData>[];
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
    updateSingleTweet(state, action) {
      if (action.payload.isLiked) {
        state.tweets = state.tweets.filter(
          (tweet) => tweet.id !== action.payload.id
        );
      } else {
        state.tweets = state.tweets.map((tweet) => {
          if (tweet.id === action.payload.id) {
            tweet.likes = [...tweet.likes, action.payload.userRef];
          }
          return tweet;
        });
      }
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

    // sort tweets by date
    tweets.sort((a, b) => b.date.seconds - a.date.seconds);

    // dispatch action to add tweets to state
    dispatch(updateTweets(tweets));
  };

//push a reference of the user into the likes array and push tweet references into the likes array of user document
export const likeTweet =
  (tweetId: string, userEmail: string, isLiked: boolean): AppThunk =>
  async (dispatch) => {
    const tweetRef = doc(db, "tweets", tweetId);
    const userRef = doc(db, "users", userEmail);

    dispatch(updateSingleTweet({ tweetId, userRef, isLiked }));
    dispatch(updateUserLikes({ tweetRef, isLiked }));

    await updateDoc(tweetRef, {
      likes: arrayUnion(userRef),
    });
    await updateDoc(userRef, {
      likes: arrayUnion(tweetRef),
    });
  };

//remove a reference of the user from the likes array and remove tweet references from the likes array of user document
export const unlikeTweet =
  (tweetId: string, userEmail: string, isLiked: boolean): AppThunk =>
  async (dispatch) => {
    const tweetRef = doc(db, "tweets", tweetId);
    const userRef = doc(db, "users", userEmail);

    dispatch(updateSingleTweet({ tweetId, userRef, isLiked }));
    dispatch(updateUserLikes({ tweetRef, isLiked }));

    await updateDoc(tweetRef, {
      likes: arrayRemove(userRef),
    });
    await updateDoc(userRef, {
      likes: arrayRemove(tweetRef),
    });
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

export const { addTweet, updateTweets, updateSingleTweet } = tweetSlice.actions;

export default tweetSlice.reducer;
