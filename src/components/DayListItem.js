import "./DayListItem.scss"

export default function DayListItem(props) {
  const handleClick = () => {
    return props.setDay ? props.setDay(props.name) : null
  }

  let dayClass = "day-list__item"

  if (props.selected) {
    dayClass += "--selected"
  }

  if (props.spots === 0) {
    dayClass += "--full"
  }

  return (
    <li className={dayClass} onClick={handleClick}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}