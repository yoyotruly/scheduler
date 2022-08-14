import {
  render,
  fireEvent,
  screen,
  getByAltText,
  getAllByTestId,
  findByText,
  getByPlaceholderText,
  getByText,
  queryByText,
  findByAltText,
} from "@testing-library/react";
import { server, rest } from "../../mocks/testServer";

import App from "../../App";

describe("App", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    render(<App />);

    await screen.findByText("Monday");

    fireEvent.click(screen.getByText("Tuesday"));

    expect(screen.getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<App />);

    await findByText(container, "Archie Cohen");

    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await findByText(appointment, "Lydia Miller-Jones");

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<App />);

    await findByText(container, "Archie Cohen");

    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(
      getByText(appointment, /delete the appointment/i)
    ).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();

    await findByAltText(appointment, "Add");

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<App />);

    await findByText(container, "Archie Cohen");

    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Rick Sanchez" },
    });
    fireEvent.click(getByAltText(appointment, "Tori Malcolm"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await findByText(appointment, "Rick Sanchez");
    await findByText(appointment, "Tori Malcolm");

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });

  // it("shows the save error when failing to save an appointment", async () => {
  //   server.use(rest.put("/api/appointments/1"), (req, res, ctx) => {
  //     return res(ctx.json({}));
  //   });

  //   const { container } = render(<App />);

  //   await findByText(container, "Archie Cohen");

  //   const appointment = getAllByTestId(container, "appointment")[0];
  //   fireEvent.click(getByAltText(appointment, "Add"));

  //   fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
  //     target: { value: "Lydia Miller-Jones" },
  //   });
  //   fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  //   fireEvent.click(getByText(appointment, "Save"));

  //   expect(getByText(appointment, /saving/i)).toBeInTheDocument();

  //   await findByText(appointment, /could not save appointment/i);

  //   fireEvent.click(getByAltText(appointment, "Close"));

  //   expect(
  //     getByPlaceholderText(appointment, /enter student name/i)
  //   ).toBeInTheDocument();

  //   const day = getAllByTestId(container, "day").find((day) =>
  //     queryByText(day, "Monday")
  //   );

  //   expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  // });

  // it("shows the delete error when failing to delete an existing appointment", async () => {
  //   server.use(rest.delete("/api/appointments/2"), (req, res, ctx) => {
  //     return res(ctx.status(500));
  //   });

  //   const { container } = render(<App />);

  //   await findByText(container, "Archie Cohen");

  //   const appointment = getAllByTestId(container, "appointment").find(
  //     (appointment) => queryByText(appointment, "Archie Cohen")
  //   );
  //   fireEvent.click(getByAltText(appointment, "Delete"));

  //   expect(
  //     getByText(appointment, /delete the appointment/i)
  //   ).toBeInTheDocument();

  //   fireEvent.click(getByText(appointment, "Confirm"));

  //   expect(getByText(appointment, /deleting/i)).toBeInTheDocument();

  //   await findByText(appointment, /could not delete appointment/i);

  //   fireEvent.click(getByAltText(appointment, "Close"));

  //   expect(getByText(appointment, /Archie Cohen/i)).toBeInTheDocument();

  //   const day = getAllByTestId(container, "day").find((day) =>
  //     queryByText(day, "Monday")
  //   );

  //   expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  // });
});
