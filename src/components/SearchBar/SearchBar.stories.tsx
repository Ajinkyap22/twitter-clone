import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SearchBar from "components/SearchBar/SearchBar";

export default {
  title: "SearchBar",
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => (
  <SearchBar {...(args as object)} />
);

export const Default = Template.bind({});

Default.args = {};
