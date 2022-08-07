import { action } from "@storybook/addon-actions";

import "../index.scss";
import Button from "../components/Button";

export default {
  title: "Button",
  component: Button,
  parameters: {
    backgrounds: {
      values: [{ name: "dark", value: "#222f3e" }],
    },
  },
};

export const Base = () => {
  return <Button>Base</Button>;
};

export const Confirm = () => {
  return <Button confirm>Confirm</Button>;
};

export const Danger = () => {
  return <Button danger>Cancel</Button>;
};

export const Clickable = () => {
  return <Button onClick={action("button-clicked")}>Clickable</Button>;
};

export const Disabled = () => {
  return (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  );
};
