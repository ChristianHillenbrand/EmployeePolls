import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { handleAnswerQuestion } from "../actions/questions";

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

const Poll = ({ dispatch, authedUser, qid, avatarURL, optionOne, optionTwo }) => {
  function handleVote(answer) {
    dispatch(handleAnswerQuestion({ authedUser, qid, answer }));
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

function formatOption(question, option, answer, totalVotes) {
  return {
    text: question[option].text,
    votes: question[option].votes.length,
    percentage: Math.round(question[option].votes.length / totalVotes * 100),
    state: !answer ? "open" : (option === answer ? "chosen" : "rejected")
  };
}

function mapStateToProps({authedUser, users, questions}, props) {
  const question = questions[props.routerParams.qid];

  const user = users[authedUser];
  const answer = question.id in user.answers ? user.answers[question.id] : ""; 
  const totalVotes = question.optionOne.votes.length + 
    question.optionTwo.votes.length;

  return {
    authedUser,
    qid: question.id,
    avatarURL: users[question.author].avatarURL,
    optionOne: formatOption(question, "optionOne", answer, totalVotes),
    optionTwo: formatOption(question, "optionTwo", answer, totalVotes)
  };
}

export default withRouterParams(connect(mapStateToProps)(Poll));