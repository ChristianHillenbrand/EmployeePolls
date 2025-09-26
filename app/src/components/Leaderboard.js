import { connect } from "react-redux";

const Score = ({name, avatarURL, questions, answers}) => {
  return (
    <li className="score" key={name}>
      <div className="user">
        <img className="avatar avatar-small" src={avatarURL} alt="Avatar"/>
        <label>{name}</label>
      </div>
      <label>Questions asked: {questions}</label>
      <label>Questions answered: {answers}</label>
    </li>
  )
}

const Leaderboard = ({scores}) => {
  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <ul className="leaderboardlist">
        {
          scores.map(score => <Score {...score}/>)
        }
      </ul>
    </div>
  );
}

function mapStateToProps({users}) {
  return {
    scores: 
      Object.values(users).map(user => ({
        name: user.name,
        avatarURL: user.avatarURL,
        answers: Object.keys(user.answers).length,
        questions: user.questions.length
      })).sort((a, b) => (b.answers + b.questions) - (a.answers + a.questions))
  };
}

export default connect(mapStateToProps)(Leaderboard);
