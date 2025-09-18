import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";

const App = ({dispatch}) => {
  useEffect(() => {
    dispatch(handleInitialData());
  });

  return <div>Hello World</div>;
}

export default connect()(App);
