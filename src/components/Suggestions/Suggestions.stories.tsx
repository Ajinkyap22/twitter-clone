import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Suggestions from "components/Suggestions/Suggestions";

export default {
  title: "Suggestions",
  component: Suggestions,
} as ComponentMeta<typeof Suggestions>;

const Template: ComponentStory<typeof Suggestions> = (args) => (
  <Suggestions {...(args as object)} />
);

export const Default = Template.bind({});

Default.args = {};
