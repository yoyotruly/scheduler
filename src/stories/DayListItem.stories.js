import { action } from "@storybook/addon-actions";

import "../index.scss";
import DayListItem from "../components/DayListItem";

export default {
  title: "DayListItem",
  component: DayListItem,
  parameters: {
    backgrounds: {
      values: [{ name: "dark", value: "#222f3e" }],
    },
  },
};

export const Unselected = () => {
  return <DayListItem name="Monday" spots={5} />;
};

export const Selected = () => {
  return <DayListItem name="Monday" spots={5} selected />;
};

export const Full = () => {
  return <DayListItem name="Monday" spots={0} />;
};

export const Clickable = () => {
  return <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} />;
};
