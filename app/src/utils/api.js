import { 
  _getUsers, 
  _getQuestions, 
  _saveQuestion, 
  _saveQuestionAnswer 
} from "./_DATA";

export function getUsers() {
  return _getUsers();
}

export function getQuestions() {
  return _getQuestions();
}

export function saveQuestion() {
  return _saveQuestion();
}

export function saveQuestionAnswer() {
  return _saveQuestionAnswer();
}