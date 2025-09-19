import { useState } from "react";
import { connect } from "react-redux";

const TitleBar = ({authedUser}) => {
  return (
    <div className="title-bar-container">
      <div className="nav-container">
        <button>Home</button>
        <button>Leaderboard</button>
        <button>New Poll</button>
      </div>
      <div className="logout-container">
        <label>User: {authedUser}</label>
        <button>Logout</button>
      </div>
    </div>
  );
};

const mapStateToProps = ({authedUser}) => {
  return {authedUser};
}

export default connect(mapStateToProps)(TitleBar);