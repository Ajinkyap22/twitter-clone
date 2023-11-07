import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import TweetCard from "components/TweetCard/TweetCard";

import { dummyTweet } from "data/data";

export default {
  title: "TweetCard",
  component: TweetCard,
} as ComponentMeta<typeof TweetCard>;

const Template: ComponentStory<typeof TweetCard> = (args) => (
  <TweetCard {...args} />
);

export const Default = Template.bind({});

Default.args = {
  tweet: dummyTweet,
  name: "Ajinkya",
  picture:
    "https://firebasestorage.googleapis.com/v0/b/twitter-clone-13869.appspot.com/o/images%2Flc0u8hhh.png?alt=media&token=cde48435-079e-48fe-939c-877e4aa9c1ef",
  username: "ajinkyap22",
  likes: 0,
  isLiked: false,
  handleTweetLike: () => {
    return;
  },
  handleRetweet: () => {
    return;
  },
  popover: <div></div>,
  isRetweeted: false,
};
