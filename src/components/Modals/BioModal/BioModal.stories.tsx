import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BioModal from "components/Modals/BioModal/BioModal";

export default {
  title: "BioModal",
  component: BioModal,
} as ComponentMeta<typeof BioModal>;

const Template: ComponentStory<typeof BioModal> = (args) => (
  <BioModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  show: true,
  onHide: () => {
    return;
  },
  bio: "Hey there!",
  setBio: () => {
    return;
  },
  location: "United Kingdom",
  setLocation: () => {
    return;
  },
  handleBack: () => {
    return;
  },
};
