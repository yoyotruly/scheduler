import { action } from "@storybook/addon-actions";

import "../index.scss";
import InterviewerList from "../components/InterviewerList";

export default {
  title: 'InterviewerList',
  component: InterviewerList,
  parameters: {
    backgrounds: {
      values: [{ name: "dark", value: "#222f3e" }]
    } 
  }
};

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

export const Initial = () => {
  return (
    <InterviewerList
      interviewers={interviewers}
    />
  )
}

export const Selected = () => {
  return (
    <InterviewerList
      interviewers={interviewers}
      interviewer={3}
    />
  )
}

export const Clickable = () => {
  return (
    <InterviewerList
      interviewers={interviewers}
      setInterviewer={action("setInterviewer")}
    />
  )
}