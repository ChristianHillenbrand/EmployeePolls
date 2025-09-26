import { useNavigate } from "react-router-dom";

const PollListItem = ({question}) => {
  const navigate = useNavigate();
  
  const date = new Date(question.timestamp);
  const timestamp = date.toLocaleString();

  return (
    <li key={question.id}>
      <button className="polllist-item" onClick={() => {navigate("/questions/" + question.id)}}>
        <span>{question.author}</span>
        <span>{timestamp}</span>
      </button>
    </li>
  );
};

const PollList = ({questions}) => {
  return (
    <ul className="polllist">
      {
        questions.length ? 
          questions.map(question => 
            <PollListItem question={question}/>
          ) :
        <li>No polls available.</li>
      }
    </ul>
  );
};

export default PollList;
