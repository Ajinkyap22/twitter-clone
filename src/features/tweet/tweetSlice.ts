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
  deleteDoc,
  arrayUnion,
  getDoc,
  Timestamp,
  arrayRemove,
  refEqual,
} from "firebase/firestore";
import {
  updateUserTweets,
  updateUserLikes,
  deleteUserTweet,
  updateUserAfterRetweet,
} from "features/user/userSlice";

export type TTweet = {
  id: string;
  text: string;
  media: string[];
  author: DocumentReference<DocumentData>;
  date: Timestamp;
  likes: DocumentReference<DocumentData>[];
  retweets: DocumentReference<DocumentData>[];
  replies: TTweet[];
  isReply: boolean;
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
        state.tweets = state.tweets.map((tweet) => {
          if (tweet.id === action.payload.id) {
            tweet.likes = tweet.likes.filter(
              (userRef) => !refEqual(userRef, action.payload.userRef)
            );
          }

          return tweet;
        });
      } else {
        state.tweets = state.tweets.map((tweet) => {
          if (tweet.id === action.payload.id) {
            tweet.likes = [...tweet.likes, action.payload.userRef];
          }
          return tweet;
        });
      }
    },
    deleteTweets(state, action) {
      state.tweets = state.tweets.filter(
        (tweet) => tweet?.id !== action.payload
      );
    },
    updateTweetAfterRetweet(state, action) {
      if (action.payload.isRetweet) {
        state.tweets = state.tweets.map((tweet) => {
          if (tweet.id === action.payload.id) {
            tweet.retweets = tweet.retweets.filter(
              (userRef) => !refEqual(userRef, action.payload.userRef)
            );
          }

          return tweet;
        });
      } else {
        state.tweets = state.tweets.map((tweet) => {
          if (tweet.id === action.payload.id) {
            tweet.retweets = [...tweet.retweets, action.payload.userRef];
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

      if (!userTweets) continue;

      for (const tweetRef of userTweets) {
        const tweetDoc = await getDoc(tweetRef);
        const tweet = tweetDoc.data() as TTweet;
        tweets = [...tweets, tweet];
      }
    }
    //fetch all retweets from user's retweets list and user's following list and add to tweets array
    const userRetweets = user.retweets;

    for (const tweetRef of userRetweets) {
      const tweetDoc = await getDoc(tweetRef);
      const tweet = tweetDoc.data() as TTweet;
      tweets = [...tweets, tweet];
    }

    for (const userRef of followingList) {
      const userDoc = await getDoc(userRef);
      const user = userDoc.data();
      const userRetweets = user?.retweets;

      if (!userRetweets) continue;

      for (const tweetRef of userRetweets) {
        const tweetDoc = await getDoc(tweetRef);
        const tweet = tweetDoc.data() as TTweet;
        tweets = [...tweets, tweet];
      }
    }

    // sort tweets by date
    tweets.sort((a, b) => b.date.seconds - a.date.seconds);

    // dispatch action to add tweets to state
    dispatch(updateTweets(tweets));
  };

//push a reference of the user into the likes array and push tweet references into the likes array of user document
export const likeTweet =
  (tweetId: string, userEmail: string): AppThunk =>
  async (dispatch) => {
    const tweetRef = doc(db, "tweets", tweetId);
    const userRef = doc(db, "users", userEmail);

    dispatch(updateSingleTweet({ tweetId, userRef, isLiked: false }));
    dispatch(updateUserLikes({ tweetRef, isLiked: false }));

    await updateDoc(tweetRef, {
      likes: arrayUnion(userRef),
    });

    await updateDoc(userRef, {
      likes: arrayUnion(tweetRef),
    });
  };

//remove a reference of the user from the likes array and remove tweet references from the likes array of user document
export const unlikeTweet =
  (tweetId: string, userEmail: string): AppThunk =>
  async (dispatch) => {
    const tweetRef = doc(db, "tweets", tweetId);
    const userRef = doc(db, "users", userEmail);

    dispatch(updateSingleTweet({ tweetId, userRef, isLiked: true }));
    dispatch(updateUserLikes({ tweetId, tweetRef, isLiked: true }));

    await updateDoc(tweetRef, {
      likes: arrayRemove(userRef),
    });

    await updateDoc(userRef, {
      likes: arrayRemove(tweetRef),
    });
  };

//delete a tweet from the database and remove the tweet reference from the user's tweets array
export const deleteTweet =
  (tweetId: string, userEmail: string): AppThunk =>
  async (dispatch) => {
    const tweetRef = doc(db, "tweets", tweetId);
    const userRef = doc(db, "users", userEmail);

    dispatch(deleteUserTweet(tweetRef));
    dispatch(deleteTweets(tweetId));

    await deleteDoc(tweetRef);

    await updateDoc(userRef, {
      tweets: arrayRemove(tweetRef),
    });
  };
//make the tweet a retweet
export const retweet =
  (tweetId: string, userEmail: string): AppThunk =>
  async (dispatch) => {
    const tweetRef = doc(db, "tweets", tweetId);
    const userRef = doc(db, "users", userEmail);

    dispatch(
      updateTweetAfterRetweet({ id: tweetId, userRef, isRetweet: false })
    );
    dispatch(updateUserAfterRetweet({ tweetRef, isRetweet: false }));

    await updateDoc(tweetRef, {
      retweets: arrayUnion(userRef),
    });

    await updateDoc(userRef, {
      retweets: arrayUnion(tweetRef),
    });
  };
//unretweet a tweet
export const unretweet =
  (tweetId: string, userEmail: string): AppThunk =>
  async (dispatch) => {
    const tweetRef = doc(db, "tweets", tweetId);
    const userRef = doc(db, "users", userEmail);
    dispatch(
      updateTweetAfterRetweet({ id: tweetId, userRef, isRetweet: true })
    );
    dispatch(updateUserAfterRetweet({ tweetRef, isRetweet: true }));

    await updateDoc(tweetRef, {
      retweets: arrayRemove(userRef),
    });
    await updateDoc(userRef, {
      retweets: arrayRemove(tweetRef),
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

export const {
  addTweet,
  updateTweets,
  updateSingleTweet,
  deleteTweets,
  updateTweetAfterRetweet,
} = tweetSlice.actions;

export default tweetSlice.reducer;
