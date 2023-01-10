import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "features/user/userSlice";
import tweetReducer from "features/tweet/tweetSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tweet: tweetReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
