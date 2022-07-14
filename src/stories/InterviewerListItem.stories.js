import { action } from "@storybook/addon-actions";

import "../index.scss";
import InterviewerListItem from "../components/InterviewerListItem";

export default {
  title: 'InterviewerListItem',
  component: InterviewerListItem,
  parameters: {
    backgrounds: {
      values: [{ name: "dark", value: "#222f3e" }]
    } 
  }
};

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

export const Unselected = () => {
  return (
    <InterviewerListItem
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  )
}

export const Selected = () => {
  return (
    <InterviewerListItem
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  )
}

export const Clickable = () => {
  return (
    <InterviewerListItem
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={() => action("setInterviewer")(interviewer.id)}
    />
  )
}