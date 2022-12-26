import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import EditProfileModal from "components/Modals/EditProfileModal/EditProfileModal";
import { Timestamp } from "firebase/firestore";

export default {
  title: "EditProfileModal",
  component: EditProfileModal,
} as ComponentMeta<typeof EditProfileModal>;

const Template: ComponentStory<typeof EditProfileModal> = (args) => (
  <EditProfileModal {...args} />
);

export const Default = Template.bind({});

Default.args = {
  show: true,
  onHide: () => {
    return;
  },
  currentUser: {
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
  },
};
