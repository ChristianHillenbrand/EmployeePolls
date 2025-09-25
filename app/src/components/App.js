import { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Login from "./Login";
import NotFound from "./NotFound";
import TitleBar from "./TitleBar";
import Polls from "./Polls";
import Poll from "./Poll";
import Leaderboard from "./Leaderboard";
import New from "./New";

const Layout = () => {
  return (
    <>
      <TitleBar />
      <Outlet />
    </>
  );
}

const App = ({dispatch, authedUser}) => {
  useEffect(() => {
    dispatch(handleInitialData());
  });

  if (!authedUser) {
    return <Login/>;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Polls />} />
        <Route path="questions/:qid" element={<Poll/>}/>
        <Route path="leaderboard" element={<Leaderboard/>}/>
        <Route path="add" element={<New/>}/>
        <Route path="*" element={<NotFound/>}></Route>
      </Route>
    </Routes>
  );
}

const mapStateToProps = ({authedUser}) => {
  return {authedUser};
}

export default connect(mapStateToProps)(App);
