import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import WhatsHappening from "./WhatsHappening";

export default {
  title: "WhatsHappening",
  component: WhatsHappening,
} as ComponentMeta<typeof WhatsHappening>;

const Template: ComponentStory<typeof WhatsHappening> = (args) => (
  <WhatsHappening {...(args as object)} />
);

export const Default = Template.bind({});

Default.args = {};
