import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ImagePreview from "components/ImagePreview/ImagePreview";

import image from "assets/images/Logo.svg";

export default {
  title: "ImagePreview",
  component: ImagePreview,
} as ComponentMeta<typeof ImagePreview>;

const Template: ComponentStory<typeof ImagePreview> = (args) => (
  <ImagePreview {...args} />
);

export const Default = Template.bind({});

Default.args = {
  imageInput: image,
  removeImage: () => {
    return;
  },
};
