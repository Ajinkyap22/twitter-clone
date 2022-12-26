import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

export default {
  title: "LoadingSpinner",
  component: LoadingSpinner,
} as ComponentMeta<typeof LoadingSpinner>;

const Template: ComponentStory<typeof LoadingSpinner> = (args) => (
  <LoadingSpinner {...(args as object)} />
);

export const Default = Template.bind({});

Default.args = {};
