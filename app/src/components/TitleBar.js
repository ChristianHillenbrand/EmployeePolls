import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

const TitleBar = ({dispatch, authedUser, avatarURL}) => {
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
        <div className="user">
          <img className="avatar avatar-small" src={avatarURL} alt="Avatar"/>
          <span>{authedUser}</span>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

const mapStateToProps = ({authedUser, users}) => {
  const avatarURL = users[authedUser].avatarURL;
  return {authedUser, avatarURL};
}

export default connect(mapStateToProps)(TitleBar);