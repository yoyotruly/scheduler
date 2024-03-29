import classNames from "classnames";
import "./DayListItem.scss";

export default function DayListItem(props) {
  const handleClick = () => {
    return props.setDay(props.name);
  };

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = (spots) => {
    if (spots === 0) return "no spots";
    if (spots === 1) return "1 spot";

    return `${spots} spots`;
  };

  return (
    <li className={dayClass} onClick={handleClick} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}
