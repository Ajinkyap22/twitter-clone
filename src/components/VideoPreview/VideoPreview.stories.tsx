import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import VideoPreview from "components/VideoPreview/VideoPreview";

export default {
  title: "VideoPreview",
  component: VideoPreview,
} as ComponentMeta<typeof VideoPreview>;

const Template: ComponentStory<typeof VideoPreview> = (args) => (
  <VideoPreview {...args} />
);

export const Default = Template.bind({});

Default.args = {
  videoInput:
    "https://firebasestorage.googleapis.com/v0/b/twitter-clone-13869.appspot.com/o/videos%2Flc02cgje.mp4?alt=media&token=fc33433a-00b1-4ab9-921d-267b11ea678e",
  removeVideo: () => {
    return;
  },
};
