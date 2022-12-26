import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import UserInfo from "components/UserInfo/UserInfo";
import { Timestamp } from "firebase/firestore";

export default {
  title: "UserInfo",
  component: UserInfo,
} as ComponentMeta<typeof UserInfo>;

const Template: ComponentStory<typeof UserInfo> = (args) => (
  <UserInfo {...args} />
);

export const Default = Template.bind({});

Default.args = {
  user: {
    name: "Damini Pandey",
    email: "daminipandey1310@gmail.com",
    picture: " https://avatars.githubusercontent.com/u/61384878?v=4",
    username: "minnieyoyo",
    location: "India",
    bio: "Heya ",
    joinDate: Timestamp.now(),
    followers: [],
    following: [],
    isVerified: true,
    tweets: [],
    likes: [],
    bookmarks: [],
    retweets: [],
  },
};
