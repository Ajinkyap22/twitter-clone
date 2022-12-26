import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Logo from "assets/images/Logo.svg";

import PictureModal from "components/Modals/PictureModal/PictureModal";

export default {
  title: "PictureModal",
  component: PictureModal,
} as ComponentMeta<typeof PictureModal>;

const Template: ComponentStory<typeof PictureModal> = (args) => (
  <PictureModal {...args} />
);

export const Default = Template.bind({});

Default.args = {
  show: true,
  onHide: () => {
    return;
  },
  picture: Logo,
  setPicture: () => {
    return false;
  },
};
