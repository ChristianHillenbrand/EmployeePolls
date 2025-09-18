import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe("_saveQuestion", () => {
  it ("returns the saved question if correct data is passed", async() => {
    const question = {
      optionOneText: "This is option one.",
      optionTwoText: "This is option two.",
      author: "I am the author"
    };

    const result = await _saveQuestion(question);
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("timestamp");
    expect(result).toHaveProperty("author", question.author);
    expect(result).toHaveProperty("optionOne.votes", []);
    expect(result).toHaveProperty("optionOne.text", question.optionOneText);
    expect(result).toHaveProperty("optionTwo.votes", []);
    expect(result).toHaveProperty("optionTwo.text", question.optionTwoText);
  });

  it ("returns an error if incorrect data is passed", async() => {
    await expect(_saveQuestion({})).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
  });
});

describe("_saveQuestionAnswer", () => {
  it ("returns true if correct data is passed", async() => {
    const questionAnswer = {
      authedUser: "sarahedo",
      qid: "6ni6ok3ym7mf1p33lnez",
      answer: "optionOne"
    };

    const result = await _saveQuestionAnswer(questionAnswer);
    expect(result).toEqual(true);
  });

  it ("returns an error if incorrect data is passed", async() => {
    await expect(_saveQuestionAnswer({})).rejects.toEqual("Please provide authedUser, qid, and answer");
  });
});