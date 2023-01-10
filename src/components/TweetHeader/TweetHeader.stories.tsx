import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TweetHeader from "components/TweetHeader/TweetHeader";

export default {
  title: "TweetHeader",
  component: TweetHeader,
} as ComponentMeta<typeof TweetHeader>;

const Template: ComponentStory<typeof TweetHeader> = (args) => (
  <TweetHeader {...(args as object)} />
);

export const Default = Template.bind({});
