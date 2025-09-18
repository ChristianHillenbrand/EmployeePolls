import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Login from "./Login";

const App = ({dispatch}) => {
  useEffect(() => {
    dispatch(handleInitialData());
  });

  return <Login/>;
}

export default connect()(App);
