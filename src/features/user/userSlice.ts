import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "app/store";
import db from "firebase-config/config";
import {
  collection,
  getDoc,
  doc,
  setDoc,
  getDocs,
  query,
  limit,
  DocumentData,
  where,
  Timestamp,
} from "firebase/firestore";
import React from "react";
import { getStorage, ref, uploadString } from "firebase/storage";
import {
  DocumentReference,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";

import { TTweet } from "features/tweet/tweetSlice";

export type TUser = {
  // from auth0
  name: string;
  email: string;
  picture: string;
  // take from user
  username: string;
  location: string;
  bio: string;
  // generate ourselves
  joinDate: Timestamp;
  followers: DocumentReference<DocumentData>[];
  following: DocumentReference<DocumentData>[];
  isVerified: boolean;
  tweets: DocumentReference<DocumentData>[];
  likes: DocumentReference<DocumentData>[];
  bookmarks: DocumentReference<DocumentData>[];
};

interface TUserState {
  currentUser: TUser | null;
  suggestedUsers: TUser[];
}

const initialState: TUserState = {
  currentUser: null,
  suggestedUsers: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<TUser>) => {
      state.currentUser = action.payload;
    },
    setSuggestedUsers: (state, action: PayloadAction<TUser[]>) => {
      state.suggestedUsers = action.payload;
    },
    updateUserTweets: (
      state,
      action: PayloadAction<DocumentReference<DocumentData>>
    ) => {
      if (state.currentUser) {
        state.currentUser.tweets = [
          ...state.currentUser.tweets,
          action.payload,
        ];
      }
    },
    updateUserLikes: (state, action) => {
      if (state.currentUser) {
        if (action.payload.isLiked) {
          const user = state.currentUser;

          user.likes = user.likes.filter((like) => {
            console.log(like?.id, action.payload.tweetId);
            return like?.id !== action.payload.tweetId;
          });

          state.currentUser = user;
        } else {
          const user = state.currentUser;

          user.likes = [...user.likes, action.payload.tweetRef];

          state.currentUser = user;
        }
      }
    },
    //delete tweet from user's tweets
    deleteUserTweet: (state, action) => {
      if (state.currentUser) {
        //  delete tweet from user's tweets
        const user = state.currentUser;

        user.tweets = user.tweets.filter(
          (tweet) => tweet.id !== action.payload.id
        );

        state.currentUser = user;
      }
    },

    //update user's bookmarks
    updateUserBookmarks: (state, action) => {
      if (state.currentUser) {
        if (action.payload.isBookmarked) {
          const user = state.currentUser;
          user.bookmarks = user.bookmarks.filter((bookmark) => {
            bookmark?.id !== action.payload.id;
          });
          state.currentUser = user;
        } else {
          const user = state.currentUser;
          user.bookmarks = [...user.bookmarks, action.payload.tweetRef];
          state.currentUser = user;
        }
      }
    },
  },
});

// get current user's profile from firebase
export const fetchCurrentUser =
  (
    email: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ): AppThunk =>
  async (dispatch) => {
    setLoading(true);

    // fetch user from firebase using email as identifier
    const userRef = doc(db, "users", email);

    const userDoc = await getDoc(userRef);

    // if user exists in firebase, set current user & return true
    if (userDoc.exists()) {
      dispatch(setCurrentUser(userDoc.data() as TUser));
    }

    setLoading(false);
  };

// create a new user in firebase
export const createUser =
  (user: TUser): AppThunk =>
  async (dispatch) => {
    const userRef = doc(db, "users", user.email);

    await setDoc(userRef, user);

    dispatch(setCurrentUser(user));
  };

// update user profile picture
export const updateProfilePicture =
  (picture: string, id: string): AppThunk =>
  () => {
    const storage = getStorage();

    const imagesRef = ref(storage, `images/${id}.png`);

    // upload base64 string to firebase storage
    uploadString(imagesRef, picture.split(",")[1], "base64");
  };

//Store tweet reference in bookmark array
export const bookmarkTweet =
  (tweetId: string, currentUserEmail: string): AppThunk =>
  async (dispatch) => {
    const tweetRef = doc(db, "tweets", tweetId);
    const userRef = doc(db, "users", currentUserEmail);
    await updateDoc(userRef, {
      bookmarks: arrayUnion(tweetRef),
    });
    dispatch(updateUserBookmarks({ tweetRef, isBookmarked: false }));
  };

//remove reference from bookmark array
export const unbookmarkTweet =
  (tweetId: string, currentUserEmail: string): AppThunk =>
  async (dispatch) => {
    const tweetRef = doc(db, "tweets", tweetId);
    const userRef = doc(db, "users", currentUserEmail);
    await updateDoc(userRef, {
      bookmarks: arrayRemove(tweetRef),
    });
    dispatch(updateUserBookmarks({ tweetRef, isBookmarked: true }));
  };
// update user's profile details
// export const updateProfile =
//   (user: TUser): AppThunk =>
//   async (dispatch) => {};

// add a user to the current user's following list
// export const follow =
//   (user: TUser): AppThunk =>
//   async (dispatch) => {};

// remove a user from the current user's following list
// export const unfollow =
//   (user: TUser): AppThunk =>
//   async (dispatch) => {};

// fetch 3 random users from firebase
export const fetchSuggestedUsers =
  (email = ""): AppThunk =>
  async (dispatch) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, limit(3), where("email", "!=", email));
    const querySnapshot = await getDocs(q);
    const suggestedUsers: TUser[] = [];

    querySnapshot.forEach((doc) => {
      suggestedUsers.push(doc.data() as TUser);
    });

    dispatch(setSuggestedUsers(suggestedUsers));
  };

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectSuggestedUsers = (state: RootState) =>
  state.user.suggestedUsers;

export const {
  setCurrentUser,
  setSuggestedUsers,
  updateUserTweets,
  updateUserLikes,
  deleteUserTweet,
  updateUserBookmarks,
} = userSlice.actions;

export default userSlice.reducer;
