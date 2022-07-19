import { action } from "@storybook/addon-actions";

import "../index.scss";
import Appointment from "../components/Appointment";
import Header from "../components/Appointment/Header";

export default {
  title: 'Appointment',
  component: Appointment,
  parameters: {
    backgrounds: {
      values: [{ name: "white", value: "#fff" }]
    } 
  }
};

export const AppointmentDefault = () => {
  return <Appointment />
}

export const AppointmentWithTime = () => {
  return <Appointment time="12pm" />
}

export const HeaderDefault = () => {
  return <Header time="12pm" />
}