import { connect } from "react-redux";

const Score = ({name, avatarURL, questions, answers}) => {
  return (
    <tr key={name}>
      <td className="user">
        <img className="avatar avatar-small" src={avatarURL} alt="Avatar"/>
        <span>{name}</span>
      </td>
      <td>{questions}</td>
      <td>{answers}</td>
    </tr>
  )
}

const Leaderboard = ({scores}) => {
  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <table className="leaderboardtable">
        <thead>
          <tr>
            <th>User</th>
            <th>Questions Asked</th>
            <th>Questions Answered</th>
          </tr>
        </thead>
        <tbody>
          {
            scores.map(score => <Score {...score}/>)
          }
        </tbody>
      </table>
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
