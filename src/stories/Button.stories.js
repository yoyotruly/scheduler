import { action } from "@storybook/addon-actions";

import "../index.scss";
import Button from "../components/Button";

export default {
  title: 'Button',
  component: Button,
  // parameters: {
  //   backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  // }
};

export const Base = () => <Button>Base</Button>

export const Confirm = () => <Button confirm>Confirm</Button>

export const Danger = () => <Button danger>Cancel</Button>

export const Clickable = () => {
<Button onClick={action("button-clicked")}>Clickable</Button>
}

export const Disabled = () => {
  <Button disabled onClick={action("button-clicked")}>
    Disabled
  </Button>
}