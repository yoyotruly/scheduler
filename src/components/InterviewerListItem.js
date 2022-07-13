import "./InterviewerListItem.scss"
import classNames from "classnames"

export default function InterviewerListItem(props) {
  const handleClick = (id) => props.setInterviewer(id)

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  })

  return (
    <li
      className={interviewerClass}
      onClick={() => handleClick(props.id)}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}