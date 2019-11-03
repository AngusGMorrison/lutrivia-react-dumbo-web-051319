import React, { Component } from 'react';
import Question from "./components/Question";

const QuestionsList = ({ questions, incrementScore, setQuestionAnswered }) => {
  return (
    <div>
      {questions.map(question => {
        return(
          <Question
            key={question.text}
            question={question}
            incrementScore={incrementScore}
            setQuestionAnswered={setQuestionAnswered}
          />
        );
      })}
    </div>
  );

}

QuestionsList.defaultProps = {
  questions: []
}

export default QuestionsList;
