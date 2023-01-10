import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import NameModal from "components/Modals/NameModal/NameModal";

export default {
  title: "NameModal",
  component: NameModal,
} as ComponentMeta<typeof NameModal>;

const Template: ComponentStory<typeof NameModal> = (args) => (
  <NameModal {...args} />
);

export const Default = Template.bind({});

Default.args = {
  show: true,
  onHide: () => {
    return;
  },
  name: "Ajinkya",
  setName: () => {
    return false;
  },
};
