import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { dummyReply } from "data/data";

import Reply from "components/Reply/Reply";

export default {
  title: "Reply",
  component: Reply,
} as ComponentMeta<typeof Reply>;

const Template: ComponentStory<typeof Reply> = (args) => <Reply {...args} />;

export const Default = Template.bind({});

Default.args = {
  reply: dummyReply,
};
