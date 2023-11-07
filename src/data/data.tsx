import { Timestamp } from "firebase/firestore";
import db from "firebase-config/config";
import { doc } from "firebase/firestore";

export const dummyTweet = {
  id: "1",
  text: "This is a dummy tweet",
  date: Timestamp.now(),
  media: [
    "https://firebasestorage.googleapis.com/v0/b/twitter-clone-13869.appspot.com/o/images%2Flc0u8hhh.png?alt=media&token=cde48435-079e-48fe-939c-877e4aa9c1ef",
  ],
  likes: [],
  retweets: [],
  replies: [],
  author: doc(db, "users", "ajinkya@geekyants.com"),
  isReply: false,
};

export const dummyReply = {
  id: "2",
  text: "This is a dummy Reply",
  date: Timestamp.now(),
  media: [],
  likes: [],
  retweets: [],
  replies: [],
  author: doc(db, "users", "ajinkya@geekyants.com"),
  isReply: false,
  replyTo: "daminip",
};

export const dummyUser = {
  name: "Damini Pandey",
  email: "daminipandey1310@gmail.com",
  picture: "https://avatars.githubusercontent.com/u/61384878?v=4",
  username: "minnieyoyo",
  location: "Haldwani",
  bio: "Heya",
  joinDate: Timestamp.now(),
  followers: [],
  following: [],
  isVerified: true,
  tweets: [],
  likes: [],
  bookmarks: [],
  retweets: [],
};
