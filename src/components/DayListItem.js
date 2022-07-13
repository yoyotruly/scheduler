import "./DayListItem.scss"

export default function DayListItem(props) {
  const handleClick = () => {
    return props.setDay ? props.setDay(props.name) : null
  }

  let dayClass = "day-list__item"

  if (props.selected) {
    dayClass += " day-list__item--selected"
  }

  if (props.spots === 0) {
    dayClass += " day-list__item--full"
  }

  const formatSpots = (spots) => {
    if (spots === 0) return "no spots"
    if (spots === 1) return "1 spot"

    return `${spots} spots`
  }

  return (
    <li className={dayClass} onClick={handleClick}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}