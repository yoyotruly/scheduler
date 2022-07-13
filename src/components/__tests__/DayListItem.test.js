import { render, cleanup, screen } from "@testing-library/react";

import DayListItem from "../DayListItem";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<DayListItem />);
});

it("renders 'no spots remaining' when there are 0 spots", () => {
  render(<DayListItem name="Monday" spots={0} />);

  expect(screen.getByText("no spots remaining")).toBeInTheDocument();
});

it("renders '1 spot remaining' when there is 1 spot", () => {
  render(<DayListItem name="Monday" spots={1} />);

  expect(screen.getByText("1 spot remaining")).toBeInTheDocument();
});

it("renders '2 spots remaining' when there are 2 spots", () => {
  render(<DayListItem name="Monday" spots={2} />);

  expect(screen.getByText("2 spots remaining")).toBeInTheDocument();
});