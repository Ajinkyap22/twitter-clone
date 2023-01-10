import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import SuggestedUser from "components/SuggestedUser/SuggestedUser";

import Logo from "assets/images/Logo.svg";

export default {
  title: "SuggestedUser",
  component: SuggestedUser,
} as ComponentMeta<typeof SuggestedUser>;

const Template: ComponentStory<typeof SuggestedUser> = (args) => (
  <SuggestedUser {...args} />
);

export const DefaultUser = Template.bind({});

DefaultUser.args = {
  user: {
    name: "User Name",
    username: "username",
    picture: Logo,
    email: "ajinkya@geekyants.com",
    isVerified: true,
  },
};
