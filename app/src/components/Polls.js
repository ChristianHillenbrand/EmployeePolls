import { useState } from "react"
import { connect } from "react-redux";
import PollList from "./PollList";

function toggleSelector(selector) {
  if (selector === "Answered") {
    return "Unanswered";
  } else {
    return "Answered";
  }
}

const Polls = ({answeredQuestions, unansweredQuestions}) => {
  const [selector, setSelector] = useState("Unanswered");

  function toggleSelection() {
    setSelector(toggleSelector(selector));
  }

  return (
    <div className="polls">
      <h1>{selector} Polls</h1>
      <div className="polllist-with-selector">
        <PollList questions={selector === "Answered" ? answeredQuestions : unansweredQuestions}/>
        <button className="polls-selector" onClick={toggleSelection}>Show {toggleSelector(selector)} Polls</button>
      </div>
    </div>
  );
}

function mapStateToProps({authedUser, users, questions}) {
  const ids = Object.keys(users[authedUser].answers);
  const answeredQuestions = Object.values(questions)
    .filter(question => ids.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unansweredQuestions = Object.values(questions)
    .filter(question => !ids.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  return {answeredQuestions, unansweredQuestions};
}

export default connect(mapStateToProps)(Polls);