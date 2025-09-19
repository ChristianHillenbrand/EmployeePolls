import { useParams } from "react-router-dom";
import { connect } from "react-redux";

function GetClassName(option, answer) {
  let className = "poll-option";
  if (!answer) {
    className += " clickable";
  } else if (answer === option) {
    className += " chosen-option";
  } else {
    className += " other-option";
  }
  return className;
}

const Poll = ({ questions, answers }) => {
  const { id } = useParams();
  const question = questions[id]
  const answer = id in answers ? answers[id] : null;

  return (
    <div className="poll">
      <h1>Would You Rather</h1>
      <div className="poll-options">
        <button className={GetClassName("optionOne", answer)}>{question.optionOne.text}</button>
        <button className={GetClassName("optionTwo", answer)}>{question.optionTwo.text}</button>
      </div>
    </div>
  );
}

function mapStateToProps({authedUser, users, questions}) {
  const answers = users[authedUser].answers;
  return {questions, answers};
}

export default connect(mapStateToProps)(Poll);