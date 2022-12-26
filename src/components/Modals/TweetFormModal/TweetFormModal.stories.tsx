import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import TweetFormModal from "components/Modals/TweetFormModal/TweetFormModal";

export default {
  title: "TweetFormModal",
  component: TweetFormModal,
} as ComponentMeta<typeof TweetFormModal>;

const Template: ComponentStory<typeof TweetFormModal> = (args) => (
  <TweetFormModal {...args} />
);

export const Default = Template.bind({});

Default.args = {
  show: true,
  setShowTweetFormModal: () => {
    return;
  },
};
