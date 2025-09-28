import { useNavigate } from "react-router-dom";

const PollListItem = ({question}) => {
  const navigate = useNavigate();
  
  const date = new Date(question.timestamp);
  const timestamp = date.toLocaleString();

  return (
    <button className="poll-list-item" onClick={() => {navigate("/questions/" + question.id)}}>
      <span>{question.author}</span>
      <span>{timestamp}</span>
    </button>
  );
};

const PollList = ({questions}) => {
  return (
    <ul className="poll-list">
      {
        questions.length ? 
          questions.map(question => 
            <PollListItem key={question.id} question={question}/>
          ) :
        <span>No polls available.</span>
      }
    </ul>
  );
};

export default PollList;
