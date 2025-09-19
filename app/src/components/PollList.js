import { useNavigate } from "react-router-dom";

const PollListItem = ({question}) => {
  const navigate = useNavigate();
  
  const date = new Date(question.timestamp);
  const timestamp = date.toLocaleString();

  return (
    <li className="polllist-item clickable" key={question.id} onClick={() => {navigate("/questions/" + question.id)}}>
      <label className="clickable">{question.author}</label>
      <label className="clickable">{timestamp}</label>
    </li>
  );
};

const PollList = ({questions}) => {
  return (
    <ul className="polllist">
      {
        questions.map(question => 
          <PollListItem question={question}/>
        )
      }
    </ul>
  );
};

export default PollList;
