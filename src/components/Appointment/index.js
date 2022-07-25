import useVisualMode from "../../hooks/useVisualMode";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Status from "./Status";
import Form from "./Form";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING, true)

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
  }

  const remove = () => {
    transition(DELETING, true)

    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      { mode === "SHOW" &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={remove}
        />
      }
      { mode === "EMPTY" && <Empty onAdd={() => transition(CREATE)} /> }
      { mode === "CREATE" &&
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      }
      { mode === "SAVING" && <Status message="Saving..." /> }
      { mode === "DELETING" && <Status message="DELETING..." /> }
    </article>
  )
}