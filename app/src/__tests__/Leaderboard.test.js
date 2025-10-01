import { render, within } from "@testing-library/react";
import "@testing-library/jest-dom"

import { Provider } from "react-redux";

import store from '../store.js'
import { handleInitialData } from "../actions/shared.js";
import Leaderboard from '../components/Leaderboard.js';

export function renderWithProvider(component) {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe("Leaderboard", () => {
  it ("will contain one table with the correct header entries", () => {
    const component = renderWithProvider(<Leaderboard/>);

    const tables = component.getAllByRole("table");
    expect(tables).toHaveLength(1);

    const tableHeaders = within(tables[0]).getAllByRole("columnheader");
    expect(tableHeaders).toHaveLength(3);

    const tableHeaderTexts = tableHeaders.map(tableHeader => tableHeader.textContent);
    expect(tableHeaderTexts).toContain("User");
    expect(tableHeaderTexts).toContain("Questions Asked");
    expect(tableHeaderTexts).toContain("Questions Answered");
  });

  it ("will show the correct username, number of questions and number of answers", async () => {
    await store.dispatch(handleInitialData());
    const component = renderWithProvider(<Leaderboard/>);

    const users = store.getState().users;
    const scores = component.getAllByTestId("score");
    expect(scores).toHaveLength(Object.keys(users).length);

    scores.forEach(score => {
      const id = within(score).getByTestId("id");
      const user = users[id.textContent];

      const name = within(score).getByTestId("name");
      expect(name.textContent).toBe(user.name);

      const questions = within(score).getByTestId("questions");
      expect(questions.textContent).toBe(String(user.questions.length));

      const answers = within(score).getByTestId("answers");
      expect(answers.textContent).toBe(String(Object.keys(user.answers).length));
    });
  });
});