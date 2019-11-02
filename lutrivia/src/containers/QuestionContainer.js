import React, { Component } from 'react';
import Question from "./question";

class QuestionContainer extends Component {
  render() {
    const questions = this.props.questions

    return (
      <div>
        {questions.map(question => {
          return <Question key={question.text} question={question} incrementScore={this.incrementScore} />
        })}
      </div>
    );
  }



}

export default QuestionContainer;
