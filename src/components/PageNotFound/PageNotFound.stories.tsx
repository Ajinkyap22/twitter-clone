import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import PageNotFound from "components/PageNotFound/PageNotFound";

export default {
  title: "PageNotFound",
  component: PageNotFound,
} as ComponentMeta<typeof PageNotFound>;

const Template: ComponentStory<typeof PageNotFound> = (args) => (
  <PageNotFound {...(args as object)} />
);

export const Default = Template.bind({});

Default.args = {};
