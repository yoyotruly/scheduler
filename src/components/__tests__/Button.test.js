import { render, cleanup, fireEvent, screen } from "@testing-library/react";

import Button from "../Button";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Button />);
});

it("renders its `children` prop as text", () => {
  render(<Button>Default</Button>);

  expect(screen.getByText("Default")).toBeInTheDocument();
});

it("renders a default button style", () => {
  render(<Button>Default</Button>);

  expect(screen.getByText("Default")).toHaveClass("button");
});

it("renders a confirm button", () => {
  render(<Button confirm>Confirm</Button>);

  expect(screen.getByText("Confirm")).toHaveClass("button--confirm");
});

it("renders a danger button", () => {
  render(<Button danger>Danger</Button>);

  expect(screen.getByText("Danger")).toHaveClass("button--danger");
});

it("renders a clickable button", () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Clickable</Button>);

  const button = screen.getByText("Clickable");

  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

it("renders a disabled button", () => {
  const handleClick = jest.fn();
  render(
    <Button disabled onClick={handleClick}>
      Disabled
    </Button>
  );

  const button = screen.getByText("Disabled");

  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(0);
});
