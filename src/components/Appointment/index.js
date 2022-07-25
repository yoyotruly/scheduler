import useVisualMode from "../../hooks/useVisualMode";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import "./styles.scss";

const EMPTY = "EMPTY";
const CREATE = "CREATE";
const SHOW = "SHOW";
const EDIT = "EDIT";
const SAVING = "SAVING";
const ERROR_SAVE = "ERROR_SAVE";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_DELETE = "ERROR_DELETE";

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
    .catch(error => transition(ERROR_SAVE, true))
  }

  const remove = () => {
    transition(DELETING, true)

    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      { mode === "EMPTY" &&
        <Empty onAdd={() => transition(CREATE)} />
      }
      { mode === "SHOW" &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      }
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
      { mode === "SAVING" &&
        <Status message="Saving..." />
      }
      { mode === "ERROR_SAVE" &&
        <Error
          message="Could not save appointment."
          onClose={back}
        />
      }
      { mode === "DELETING" &&
        <Status message="DELETING..." />
      }
      { mode === "CONFIRM" &&
        <Confirm
          message="Are you sure you want to delete the appointment?"
          onConfirm={remove}
          onCancel={back}
        />
      }
      { mode === "ERROR_DELETE" &&
        <Error
          message="Could not delete appointment."
          onClose={back}
        />
      }
    </article>
  )
}