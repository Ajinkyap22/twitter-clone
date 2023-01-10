import { ComponentStory, ComponentMeta } from "@storybook/react";
import UserAvatar from "components/UserAvatar/UserAvatar";

export default {
  title: "UserAvatar",
  component: UserAvatar,
} as ComponentMeta<typeof UserAvatar>;

const Template: ComponentStory<typeof UserAvatar> = (args) => (
  <UserAvatar {...args} />
);

export const Default = Template.bind({});

Default.args = {
  picture: "https://avatars.githubusercontent.com/u/61384878?v=4",
  email: "daminipandey1310@gmail.com",
  setUser: () => {
    return;
  },
  displayEditProfileModal: () => {
    return;
  },
};
