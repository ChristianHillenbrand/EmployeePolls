import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { handleSubmitQuestion } from "../actions/questions";

const New = ({dispatch}) => {
  const navigate = useNavigate();

  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(handleSubmitQuestion(optionOneText, optionTwoText));
    navigate("/");
  }

  return (
    <div className="new">
      <h1>Would You Rather</h1>
      <form className="new-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Option One" 
          value={optionOneText} 
          onChange={(e) => setOptionOneText(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Option Two" 
          value={optionTwoText} 
          onChange={(e) => setOptionTwoText(e.target.value)}
        />
        <button 
          className="new-form-button" 
          type="submit"
          disabled={!optionOneText.length || !optionTwoText.length}
        >Submit</button>
      </form>
    </div>
  );
}

export default connect()(New);
