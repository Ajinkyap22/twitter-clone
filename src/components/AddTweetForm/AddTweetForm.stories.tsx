import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AddTweetForm from "components/AddTweetForm/AddTweetForm";

export default {
  title: "AddTweetForm",
  component: AddTweetForm,
} as ComponentMeta<typeof AddTweetForm>;

const Template: ComponentStory<typeof AddTweetForm> = (args) => (
  <AddTweetForm {...args} />
);

export const Default = Template.bind({});

Default.args = {
  isModal: true,
  closeModal: () => {
    return;
  },
};
