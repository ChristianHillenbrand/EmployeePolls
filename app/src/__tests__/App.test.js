import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from '../components/App.js';
import store from '../store.js'

function renderWithRouterAndProvider(component) {
  return render(
    <MemoryRouter>
      <Provider store={store}>
        {component}
      </Provider>
    </MemoryRouter>
  );
}

describe("App", () => {
  it ("will match snapshot", () => {
    const component = renderWithRouterAndProvider(<App/>);
    expect(component).toMatchSnapshot();
  })
  screen.debug();
});