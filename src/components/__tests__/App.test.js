import axios from "axios";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import App from "../../App";

const fixtures = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2],
      interviewers: [1, 2],
      spots: 1,
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [3, 4],
      interviewers: [3, 4],
      spots: 1,
    },
  ],
  appointments: {
    1: { id: 1, time: "12pm", interview: null },
    2: {
      id: 2,
      time: "1pm",
      interview: { student: "Archie Cohen", interviewer: 2 },
    },
    3: {
      id: 3,
      time: "2pm",
      interview: { student: "Leopold Silvers", interviewer: 4 },
    },
    4: { id: 4, time: "3pm", interview: null },
  },
  interviewers: {
    1: {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
    2: {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png",
    },
    3: {
      id: 3,
      name: "Mildred Nazir",
      avatar: "https://i.imgur.com/T2WwVfS.png",
    },
    4: {
      id: 4,
      name: "Cohana Roy",
      avatar: "https://i.imgur.com/FK8V841.jpg",
    },
  },
};

describe("App", () => {
  beforeEach(() => {
    jest.spyOn(axios, "get").mockImplementation((url) => {
      if (url === "/api/days") {
        return Promise.resolve({
          data: fixtures.days,
        });
      }

      if (url === "/api/appointments") {
        return Promise.resolve({
          data: fixtures.appointments,
        });
      }

      if (url === "/api/interviewers") {
        return Promise.resolve({
          data: fixtures.interviewers,
        });
      }
    });
  });

  afterEach(() => {
    axios.get.mockRestore();
  });

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    await render(<App />);

    await screen.findByText("Monday");

    fireEvent.click(screen.getByText("Tuesday"));
    expect(screen.getByText("Leopold Silvers")).toBeInTheDocument();
  });
});
