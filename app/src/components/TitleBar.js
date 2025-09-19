import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

const TitleBar = ({dispatch, authedUser}) => {
  function handleLogout() {
    dispatch(setAuthedUser(""));
  }

  return (
    <div className="title-bar">
      <div className="nav-bar">
        <button>Polls</button>
        <button>Leaderboard</button>
        <button>New</button>
      </div>
      <div className="logout-bar">
        <label>User: {authedUser}</label>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

const mapStateToProps = ({authedUser}) => {
  return {authedUser};
}

export default connect(mapStateToProps)(TitleBar);