import { action } from "@storybook/addon-actions";

import "../index.scss";
import DayList from "../components/DayList";

export default {
  title: "DayList",
  component: DayList,
  parameters: {
    backgrounds: {
      values: [{ name: "dark", value: "#222f3e" }],
    },
  },
};

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export const Monday = () => {
  return <DayList days={days} value={"Monday"} onChange={action("setDay")} />;
};

export const Tuesday = () => {
  return <DayList days={days} value={"Tuesday"} onChange={action("setDay")} />;
};

export const Wednesday = () => {
  return (
    <DayList days={days} value={"Wednesday"} onChange={action("setDay")} />
  );
};
