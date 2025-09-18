import { 
  _getUsers, 
  _getQuestions, 
  _saveQuestion, 
  _saveQuestionAnswer 
} from "./_DATA";

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function saveQuestion() {
  return _saveQuestion();
}

export function saveQuestionAnswer() {
  return _saveQuestionAnswer();
}