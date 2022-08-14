# Interview Scheduler

## Table of Content

- [About Interview Scheduler](#about-interview-scheduler)
- [Features](#features)
- [Get Started](#get-started)
- [Sample Pages](#sample-pages)
- [Dependencies](#dependencies)

## About Interview Scheduler

Interview Scheduler is a single-page application (SPA) that allows users to book mock interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted.

## Features

- SPA built with React
- Advanced React patterns to manage state and add live updates
- Real-time updates using WebSocket API across multiple instances
- Individual component testing in Storybook, comprehensive unit + integration tests in Jest, and full end-to-end testing with Cypress

## Get Started

Install dependencies:

```
$ npm install
```

Create `.env.local` at the root directory and add the following environment variable

```
REACT_APP_WEBSOCKET_URL=ws://localhost:8001
```

Clone and follow the instructions in this repo (https://github.com/yoyotruly/scheduler-api) to set up the backend

Start the server

```
$ npm start
```

Vist the website at http://localhost:3000 in your browser

## Demo

![home](/docs/home.png)

## Dependencies

- react
- react-dom
- axios
- classnames
- normalize.css
