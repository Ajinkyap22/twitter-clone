import React from "react";

import UsernameModal from "components/Modals/UsernameModal/UsernameModal";

import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "UsernameModal",
  component: UsernameModal,
} as ComponentMeta<typeof UsernameModal>;

const Template: ComponentStory<typeof UsernameModal> = (args) => (
  <UsernameModal {...args} />
);

export const Default = Template.bind({});

Default.args = {
  show: true,
  onHide: () => {
    return;
  },
  username: "ajinkyap22",
  setUsername: () => {
    return;
  },
  handleBack: () => {
    return;
  },
};
