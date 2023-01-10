import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import WhoToFollow from "components/WhoToFollow/WhoToFollow";
import SuggestedUser from "components/SuggestedUser/SuggestedUser";
import { DefaultUser } from "components/SuggestedUser/SuggestedUser.stories";

export default {
  title: "WhoToFollow",
  component: WhoToFollow,
} as ComponentMeta<typeof WhoToFollow>;

const Template: ComponentStory<typeof WhoToFollow> = (args) => (
  <WhoToFollow {...(args as object)} />
);

export const Default = Template.bind({});

Default.args = {
  children: (
    <SuggestedUser
      {...(DefaultUser.args as {
        user: {
          name: string;
          username: string;
          picture: string;
          email: string;
          isVerified: boolean;
        };
      })}
    />
  ),
};
