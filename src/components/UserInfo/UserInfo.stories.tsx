import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import UserInfo from "components/UserInfo/UserInfo";

import { dummyUser } from "data/data";

export default {
  title: "UserInfo",
  component: UserInfo,
} as ComponentMeta<typeof UserInfo>;

const Template: ComponentStory<typeof UserInfo> = (args) => (
  <UserInfo {...args} />
);

export const Default = Template.bind({});

Default.args = {
  user: dummyUser,
};
