import { ComponentStory, ComponentMeta } from "@storybook/react";
import BookmarksHeader from "./BookmarksHeader";

export default {
  title: "BookmarksHeader",
  component: BookmarksHeader,
} as ComponentMeta<typeof BookmarksHeader>;

const Template: ComponentStory<typeof BookmarksHeader> = (args) => (
  <BookmarksHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: "Damini Pandey",
};
