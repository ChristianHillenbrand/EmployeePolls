import { render } from "@testing-library/react";
import "@testing-library/jest-dom"

import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from '../store.js'
import { handleInitialData } from "../actions/shared.js";
import { setAuthedUser } from "../actions/authedUser.js";
import TitleBar from "../components/TitleBar.js";

export function renderWithRouterAndProvider(component) {
  return render(
    <MemoryRouter>
      <Provider store={store}>
        {component}
      </Provider>
    </MemoryRouter>
  );
};

describe("TitleBar", () => {
  it("contains all required buttons", async () => {
    await store.dispatch(handleInitialData());
    await store.dispatch(setAuthedUser("sarahedo"));
    const component = renderWithRouterAndProvider(<TitleBar/>);

    const buttons = component.getAllByRole("button");
    expect(buttons).toHaveLength(4);

    const buttonTexts = buttons.map(button => button.textContent);
    expect(buttonTexts).toContain("Home");
    expect(buttonTexts).toContain("Leaderboard");
    expect(buttonTexts).toContain("New");
    expect(buttonTexts).toContain("Logout");
  })
});