import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Sidebar from "components/Sidebar/Sidebar";

export default {
  title: "Sidebar",
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => (
  <Sidebar {...args} />
);

export const Default = Template.bind({});

Default.args = {
  showTweetFormModal: true,
  setShowTweetFormModal: () => {
    return;
  },
};
