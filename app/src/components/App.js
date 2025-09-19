import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Login from "./Login";
import TitleBar from "./TitleBar";

const App = ({dispatch, authedUser}) => {
  useEffect(() => {
    dispatch(handleInitialData());
  });

  if (authedUser) {
    return <TitleBar/>
  } else {
    return <Login/>;
  }
}

const mapStateToProps = ({authedUser}) => {
  return {authedUser};
}

export default connect(mapStateToProps)(App);
