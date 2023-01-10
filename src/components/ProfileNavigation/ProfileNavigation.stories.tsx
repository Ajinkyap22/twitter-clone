import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ProfileNavigation from "components/ProfileNavigation/ProfileNavigation";

export default {
  titile: "ProfileNavigation",
  component: ProfileNavigation,
} as ComponentMeta<typeof ProfileNavigation>;

const Template: ComponentStory<typeof ProfileNavigation> = (args) => (
  <ProfileNavigation {...args} />
);

export const Default = Template.bind({});

Default.args = {
  activeTab: "media",
  handleClick: () => {
    return;
  },
};
