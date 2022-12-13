import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import db from "../../firebase/config";
import { getDoc, doc } from "firebase/firestore";

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
}

const initialState: IUserState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
    },
  },
});

// get current user's profile from firebase
export const fetchCurrentUser =
  (email: string): AppThunk =>
  async (dispatch) => {
    // fetch user from firebase using email as identifier
    const userRef = doc(db, "users", email);

    const userDoc = await getDoc(userRef);

    // if user exists in firebase, set current user & return true
    if (userDoc.exists()) {
      dispatch(setCurrentUser(userDoc.data() as IUser));
    }
  };

// create a new user in firebase
export const createUser =
  (user: IUser): AppThunk =>
  async (dispatch) => {};

// update user's profile details
export const updateProfile =
  (user: IUser): AppThunk =>
  async (dispatch) => {};

// add a user to the current user's following list
export const follow =
  (user: IUser): AppThunk =>
  async (dispatch) => {};

// remove a user from the current user's following list
export const unfollow =
  (user: IUser): AppThunk =>
  async (dispatch) => {};

export const selectCurrentUser = (state: RootState) => state.user.currentUser;

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
