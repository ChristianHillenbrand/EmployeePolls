import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom"

import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from '../store.js'
import Login from '../components/Login.js';

export function renderWithRouterAndProvider(component) {
  return render(
    <MemoryRouter>
      <Provider store={store}>
        {component}
      </Provider>
    </MemoryRouter>
  );
};

describe("Login", () => {
  it ("will match snapshot", () => {
    const component = renderWithRouterAndProvider(<Login/>);
    expect(component).toMatchSnapshot();
  });

  it ("will show a username and password field as well as a submit button", () => {
    const component = renderWithRouterAndProvider(<Login/>);
    expect(component.getByTestId("username-input")).toBeInTheDocument();
    expect(component.getByTestId("password-input")).toBeInTheDocument();
    expect(component.getByTestId("submit-button")).toBeInTheDocument();
  });

  it ("will show an error if the username doesn't exist", () => {
    const component = renderWithRouterAndProvider(<Login/>);
    const usernameInput = component.getByTestId("username-input");
    fireEvent.change(usernameInput, { target: { value: "user" } });
    const passwordInput = component.getByTestId("password-input");
    fireEvent.change(passwordInput, { target: { value: "password" } });
    const submitButton = component.getByTestId("submit-button");
    fireEvent.click(submitButton);
    expect(component.getByTestId("error-message")).toBeInTheDocument();
  });
});