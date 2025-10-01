import { connect } from "react-redux";

const Score = ({id, name, avatarURL, questions, answers}) => {
  return (
    <tr data-testid="score">
      <td className="user">
        <img className="avatar avatar-small" src={avatarURL} alt="Avatar"/>
        <div className="name-and-id">
          <span className="name" data-testid="name">{name}</span>
          <span className="id" data-testid="id">{id}</span>
        </div>
      </td>
      <td data-testid="questions">{questions}</td>
      <td data-testid="answers">{answers}</td>
    </tr>
  )
}

const Leaderboard = ({scores}) => {
  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Questions Asked</th>
            <th>Questions Answered</th>
          </tr>
        </thead>
        <tbody>
          {
            scores.map(score => <Score key={score.id} {...score}/>)
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
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        questions: user.questions.length,
        answers: Object.keys(user.answers).length
      })).sort((a, b) => (b.answers + b.questions) - (a.answers + a.questions))
  };
}

export default connect(mapStateToProps)(Leaderboard);
