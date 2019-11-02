import React from 'react';
import SETTINGS from "./settings";
import { questions } from "./data";
import NewGameButton from "./NewGameButton";
import Score from "./Score";
import QuestionContainer from "./containers/QuestionContainer";

class App extends React.Component {
  state = {
    score: 0,
    selectedQuestions: []
  }

  render() {
    return (
      <div>
        <h1>Lutrivia</h1>
        <div>
          <NewGameButton startNewGame={this.startNewGame} />
          <Score score={this.state.score} />
        </div>
        <QuestionContainer questions={this.state.selectedQuestions} incrementScore={this.incrementScore} />
        {/* <ScoreForm /> */}
      </div>
    );
  }

  startNewGame = () => {
    this.selectQuestions();
    this.resetScore();
  }

  selectQuestions = () => {
    const questionIndices = this.generateRandomQuestionIndices();
    const selectedQuestions = questionIndices.map(index => {
      return questions[index];
    });
    this.setState({ selectedQuestions });
  }

  generateRandomQuestionIndices = () => {
    const indices = [];
    while (indices.length < SETTINGS.maxQuestions) {
      const index = Math.floor(Math.random() * questions.length);
      !indices.includes(index) && indices.push(index);
    }
    return indices;
  }

  resetScore = () => {
    this.setState({ score: 0 });
  }

  incrementScore = () => {
    this.setState(prevState => {
      return { score: ++prevState.score }
    });
  }

}

export default App;
