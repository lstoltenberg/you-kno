import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from '@testing-library/user-event'
import StartPage from "./StartPage";
import { Route, Router } from "react-router-dom";
import { createMemoryHistory } from "history";


test("renders start button", () => {
  render(<App />);
  const startButton = screen.getByText(/Start Game/i);
  expect(startButton).toBeInTheDocument();
});

test("renders ten player name fields", () => {
  render(<App />);
  const playerNameFields = screen.getAllByRole("textbox");
  expect(playerNameFields.length).toEqual(10);
});

test("navigates to /game when you click start game with minimum players", () => {
  const history = createMemoryHistory();

  render(
    <Router history = {history}>
      <StartPage />
    </Router>
  );

  const playerNameFields = screen.getAllByRole("textbox");
  userEvent.type(playerNameFields[0], "Luke");
  userEvent.type(playerNameFields[1], "Josh");
  const startButton = screen.getByText(/Start Game/i);
  startButton.click();

  expect(history.location.pathname).toBe("/game");
});