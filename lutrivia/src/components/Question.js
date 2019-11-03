import React, { Component } from 'react';

export class Question extends Component {
  render() {
    const question = this.props.question;

    return (
      <div>
        <p>{question.text}</p>
        <div>
          <button name="true" disabled={question.answered} onClick={this.handleClick}>True</button>
          <button name="false" disabled={question.answered} onClick={this.handleClick}>False</button>
        </div>
      </div>
    );
  }

  handleClick = event => {
    const question = this.props.question;
    const button = event.target;

    if (question.answer.toString() === button.name) {
      this.recordCorrectAnswer(button);
    } else {
      button.classList.add("incorrect");
    }
    
    this.props.setQuestionAnswered(question)
  }

  recordCorrectAnswer = button => {
    button.classList.add("correct");
    this.props.incrementScore();
  }

}

Question.defaultProps = {
  question: {
    text: "Question not found",
    answered: true
  }
}

export default Question;
