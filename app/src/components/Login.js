import { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

function isValidUser(username, password, userList) {
  return userList.some(
    user => user.id === username && user.password === password
  );
}

const Login = ({dispatch, userList}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidUser(username, password, userList)) {
      dispatch(setAuthedUser(username));
      setError("");
    } else {
      setError("Invalid username or password!");
    }

    setPassword("");
    setUsername("");
  }

  return (
    <div className="login">
      <h1>Employee Polls</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={handleUsername}/>
        <input type="password" placeholder="Password" value={password} onChange={handlePassword}/>
        <button type="submit" disabled={username === "" || password === ""}>Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

function mapStateToProps({users}) {
  const userList = Object.values(users).map(({id, password}) => ({
    id, password
  }));
  return {userList};
};

export default connect(mapStateToProps)(Login);