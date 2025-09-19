import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

const TitleBar = ({dispatch, authedUser}) => {
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(setAuthedUser(""));
  }

  return (
    <div className="title-bar">
      <div className="nav-bar">
        <button onClick={() => navigate("/")}>Polls</button>
        <button onClick={() => navigate("/leaderboard")}>Leaderboard</button>
        <button onClick={() => navigate("/add")}>New</button>
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