const PollListItem = ({question}) => {
  const handleClick = () => {
  }
  
  const date = new Date(question.timestamp);
  const timestamp = date.toLocaleString();

  return (
    <li className="polllist-item" onClick={handleClick}>
      <label>{question.author}</label>
      <label>{timestamp}</label>
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
