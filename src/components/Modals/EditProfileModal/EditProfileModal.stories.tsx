import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import EditProfileModal from "components/Modals/EditProfileModal/EditProfileModal";

import { dummyUser } from "data/data";

export default {
  title: "EditProfileModal",
  component: EditProfileModal,
} as ComponentMeta<typeof EditProfileModal>;

const Template: ComponentStory<typeof EditProfileModal> = (args) => (
  <EditProfileModal {...args} />
);

export const Default = Template.bind({});

Default.args = {
  show: true,
  onHide: () => {
    return;
  },
  currentUser: dummyUser,
};
