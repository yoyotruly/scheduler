import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import Form from "../Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
  ];

  it("renders without student name if not provided", () => {
    render(<Form interviewers={interviewers} />);

    expect(screen.getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    render(<Form interviewers={interviewers} student="Lydia Miller-Jones" />);

    expect(screen.getByTestId("student-name-input")).toHaveValue(
      "Lydia Miller-Jones"
    );
  });

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
    render(<Form interviewers={interviewers} onSave={onSave} />);
    fireEvent.click(screen.getByText("Save"));

    expect(
      screen.getByText(/student name cannot be blank/i)
    ).toBeInTheDocument();

    expect(onSave).not.toHaveBeenCalled();
  });

  it("validates that the interviewer cannot be null", () => {
    const onSave = jest.fn();
    render(
      <Form
        interviewers={interviewers}
        student="Lydia Miller-Jones"
        onSave={onSave}
      />
    );
    fireEvent.click(screen.getByText("Save"));

    expect(
      screen.getByText(/please select an interviewer/i)
    ).toBeInTheDocument();

    expect(onSave).not.toHaveBeenCalled();
  });

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    render(
      <Form
        interviewers={interviewers}
        onSave={onSave}
        interviewer={interviewers[0].id}
      />
    );

    fireEvent.click(screen.getByText("Save"));

    expect(
      screen.getByText(/student name cannot be blank/i)
    ).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    fireEvent.change(screen.getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(screen.getByText("Save"));

    expect(screen.queryByText(/student name cannot be blank/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    render(
      <Form
        interviewers={interviewers}
        student="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );

    fireEvent.click(screen.getByText("Save"));

    fireEvent.change(screen.getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(screen.getByText("Cancel"));

    expect(screen.queryByText(/student name cannot be blank/i)).toBeNull();

    expect(screen.getByPlaceholderText("Enter Student Name")).toHaveValue("");

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
