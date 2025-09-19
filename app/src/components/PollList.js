const PollListItem = ({question}) => {
  const handleClick = () => {
  }
  
  const date = new Date(question.timestamp);
  const timestamp = date.toLocaleString();

  return (
    <li className="polllist-item clickable" onClick={handleClick}>
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
