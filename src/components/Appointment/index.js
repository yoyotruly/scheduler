import useVisualMode from "../../hooks/useVisualMode";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Status from "./Status";
import Confirm from "./Confirm";
import Form from "./Form";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

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
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
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
      { mode === "EDIT" &&
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={back}
          onSave={save}
        />
      }
      { mode === "SAVING" && <Status message="Saving..." /> }
      { mode === "DELETING" && <Status message="DELETING..." /> }
      { mode === "CONFIRM" &&
        <Confirm
          message="Are you sure you want to delete the appointment?"
          onConfirm={remove}
          onCancel={back}
        />
      }
    </article>
  )
}