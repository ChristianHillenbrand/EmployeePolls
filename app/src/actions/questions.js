import { saveQuestion, saveQuestionAnswer } from "../utils/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const SUBMIT_QUESTION = "SUBMIT_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

function answerQuestion({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer
  };
}

export function handleAnswerQuestion({ authedUser, qid, answer }) {
  return (dispatch) => {
    return saveQuestionAnswer({ authedUser, qid, answer })
      .then(dispatch(answerQuestion({ authedUser, qid, answer })));
  };
}

function submitQuestion(question) {
  return {
    type: SUBMIT_QUESTION,
    question
  };
}

export function handleSubmitQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    }).then((formattedQuestion) => {dispatch(submitQuestion(formattedQuestion))});
  };
}