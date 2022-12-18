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
} from "firebase/firestore";
import React from "react";
import { getStorage, ref, uploadString } from "firebase/storage";

export interface IUser {
  // from auth0
  name: string;
  email: string;
  picture: string;
  // take from user
  username: string;
  location: string;
  bio: string;
  // generate ourselves
  joinDate: Date;
  followers: IUser[];
  following: IUser[];
  isVerified: boolean;
  //   tweets: ITweet[];
  //   likes: ITweet[];
  //   bookmarks: ITweet[];
}

interface IUserState {
  currentUser: IUser | null;
  suggestedUsers: IUser[];
}

const initialState: IUserState = {
  currentUser: null,
  suggestedUsers: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
    },
    setSuggestedUsers: (state, action: PayloadAction<IUser[]>) => {
      state.suggestedUsers = action.payload;
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
      dispatch(setCurrentUser(userDoc.data() as IUser));
    }

    setLoading(false);
  };

// create a new user in firebase
export const createUser =
  (user: IUser): AppThunk =>
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

    console.log("uploaded");
  };

// update user's profile details
// export const updateProfile =
//   (user: IUser): AppThunk =>
//   async (dispatch) => {};

// add a user to the current user's following list
// export const follow =
//   (user: IUser): AppThunk =>
//   async (dispatch) => {};

// remove a user from the current user's following list
// export const unfollow =
//   (user: IUser): AppThunk =>
//   async (dispatch) => {};

// fetch 3 random users from firebase
export const fetchSuggestedUsers = (): AppThunk => async (dispatch) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, limit(3));
  const querySnapshot = await getDocs(q);
  const suggestedUsers: IUser[] = [];

  querySnapshot.forEach((doc) => {
    suggestedUsers.push(doc.data() as IUser);
  });

  dispatch(setSuggestedUsers(suggestedUsers));
};

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectSuggestedUsers = (state: RootState) =>
  state.user.suggestedUsers;

export const { setCurrentUser, setSuggestedUsers } = userSlice.actions;

export default userSlice.reducer;
