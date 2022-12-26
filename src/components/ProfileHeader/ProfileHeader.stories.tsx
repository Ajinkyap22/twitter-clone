import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ProfileHeader from "./ProfileHeader";

export default {
  title: "ProfileHeader",
  component: ProfileHeader,
} as ComponentMeta<typeof ProfileHeader>;

const Template: ComponentStory<typeof ProfileHeader> = (args) => (
  <ProfileHeader {...args} />
);

export const Default = Template.bind({});

Default.args = {
  name: "User Name",
  tweets: 100,
  likes: 100,
  activeTab: "tweets",
};
