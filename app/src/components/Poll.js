import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { handleAnswerQuestion } from "../actions/questions";
import NotFound from "./NotFound";

const withRouterParams = (Component) => {
  const ComponentWithRouterParams = (props) => {
    let routerParams = useParams();
    return <Component {...props} routerParams={routerParams} />;
  };

  return ComponentWithRouterParams;
};

const PollOption = ({text, votes, percentage, state, onVote}) => {
  return (
    <div className="poll-option">
      <button 
        className={state === "chosen" ? "poll-option-chosen" : ""} 
        onClick={onVote} 
        disabled={state !== "open"}
      >{text}</button>
      {
        state !== "open" && 
          <span>{votes} {votes === 1 ? "vote" : "votes"} / {percentage} %</span>
      }
    </div>
  );
}

const Poll = ({ dispatch, notFound, authedUser, qid, avatarURL, optionOne, optionTwo }) => {
  if (notFound) {
    return <NotFound/>;
  }
  
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

function formatOption(question, option, answer) {
  const totalVotes = question.optionOne.votes.length + 
    question.optionTwo.votes.length;

  return {
    text: question[option].text,
    votes: question[option].votes.length,
    percentage: Math.round(question[option].votes.length / totalVotes * 100),
    state: !answer ? "open" : (option === answer ? "chosen" : "rejected")
  };
}

function mapStateToProps({authedUser, users, questions}, props) {
  if (!(props.routerParams.qid in questions)) {
    return {notFound: true};
  }
  
  const question = questions[props.routerParams.qid];
  const answer = question.id in users[authedUser].answers ? 
    users[authedUser].answers[question.id] : ""; 

  return {
    authedUser,
    qid: question.id,
    avatarURL: users[question.author].avatarURL,
    optionOne: formatOption(question, "optionOne", answer),
    optionTwo: formatOption(question, "optionTwo", answer)
  };
}

export default withRouterParams(connect(mapStateToProps)(Poll));