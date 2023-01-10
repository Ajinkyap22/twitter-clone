import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import MobileNav from "components/MobileNav/MobileNav";

export default {
  title: "MobileNav",
  component: MobileNav,
} as ComponentMeta<typeof MobileNav>;

const Template: ComponentStory<typeof MobileNav> = (args) => (
  <MobileNav {...(args as object)} />
);

export const Default = Template.bind({});

Default.args = {};
