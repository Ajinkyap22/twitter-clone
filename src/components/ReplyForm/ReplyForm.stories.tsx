import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ReplyForm from "components/ReplyForm/ReplyForm";

export default {
  title: "ReplyForm",
  component: ReplyForm,
} as ComponentMeta<typeof ReplyForm>;

const Template: ComponentStory<typeof ReplyForm> = (args) => (
  <ReplyForm {...args} />
);

export const Default = Template.bind({});

Default.args = {
  replyingTo: "daminip",
  tweetId: "lc0u7qsz",
};
