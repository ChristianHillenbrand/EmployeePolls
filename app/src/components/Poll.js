import { useParams } from "react-router-dom";
import { connect } from "react-redux";

const withRouterParams = (Component) => {
  const ComponentWithRouterParams = (props) => {
    let routerParams = useParams();
    return <Component {...props} routerParams={routerParams} />;
  };

  return ComponentWithRouterParams;
};

const PollOption = ({text, votes, percentage, state, onVote}) => {
  const className = state === "chosen" ? "poll-option-chosen" : "";
  const disabled = state !== "open";

  return (
    <div className="poll-option">
      <button className={className} onClick={onVote} disabled={disabled}>{text}</button>
      {
        state !== "open" && 
          <label>{votes} {votes === 1 ? "vote" : "votes"} / {percentage} %</label>
      }
    </div>
  );
}

const Poll = ({ authedUser, qid, avatarURL, optionOne, optionTwo }) => {
  function handleVote(answer) {
  }

  return (
    <div className="poll">
      <div className="poll-title">
        <img className="avatar avatar-large" src={avatarURL} alt="Avatar"/>
        <h1>Would You Rather</h1>
      </div>
      <div className="poll-options">
        <PollOption {...optionOne} onVote={() => {handleVote("optionOne")}}/>
        <PollOption {...optionTwo} onVote={() => {handleVote("optionTwo")}}/>
      </div>
    </div>
  );
}

function formatOption(option, answer, numVotes) {
  return {
    text: option.text,
    votes: option.votes.length,
    percentage: Math.round(option.votes.length / numVotes * 100),
    state: answer.length === 0 ? "open" : (answer === option.text ? "chosen" : "rejected")
  };
}

function mapStateToProps({authedUser, users, questions}, props) {
  const question = questions[props.routerParams.qid];
  const answers = users[authedUser].answers;
  const answer = question.id in answers ? question[answers[question.id]].text : "";
  const numVotes = question.optionOne.votes.length + 
    question.optionTwo.votes.length;

  return {
    authedUser,
    qid: question.id,
    avatarURL: users[question.author].avatarURL,
    optionOne: formatOption(question.optionOne, answer, numVotes),
    optionTwo: formatOption(question.optionTwo, answer, numVotes),
    answer: question.id in answers ? answers[question.id] : ""
  };
}

export default withRouterParams(connect(mapStateToProps)(Poll));