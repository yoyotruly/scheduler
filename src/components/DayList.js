import DayListItem from "./DayListItem";

export default function DayList(props) {
  const dayListItemElements = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    );
  });

  return <ul>{dayListItemElements}</ul>;
}
