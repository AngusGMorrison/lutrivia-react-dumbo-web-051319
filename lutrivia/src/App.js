import React from 'react';
import SETTINGS from "./settings";
import { questions } from "./data";
import NewGameButton from "./components/NewGameButton";
import Score from "./components/Score";
import QuestionsList from "./components/QuestionsList";
import ScoreForm from "./components/ScoreForm";

class App extends React.Component {
  state = {
    score: 0,
    selectedQuestions: [],
    gameOver: false,
    hiscores: []
  }

  render() {
    return (
      <div>
        <h1>Lutrivia</h1>
        <div>
          <NewGameButton startNewGame={this.startNewGame} />
          <Score score={this.state.score} />
        </div>
        <QuestionsList
          questions={this.state.selectedQuestions}
          incrementScore={this.incrementScore}
          setQuestionAnswered={this.setQuestionAnswered}
        />
        <ScoreForm submitScore={this.submitScore} />
      </div>
    );
  }

  componentDidUpdate() {
    if (this.allQuestionsAreAnswered() && !this.state.gameOver) {
      this.setState({ gameOver: true })
    }
  }

  startNewGame = () => {
    this.resetScore();
    const uninitializedQuestions = this.selectQuestions();
    this.initializeQuestions(uninitializedQuestions);
  }

  resetScore = () => {
    this.setState({ score: 0 });
  }

  selectQuestions = () => {
    const questionIndices = this.generateRandomQuestionIndices();
    const uninitializedQuestions = questionIndices.map(index => {
      return questions[index];
    });
    return uninitializedQuestions;
  }

  generateRandomQuestionIndices = () => {
    const indices = [];
    while (indices.length < SETTINGS.maxQuestions) {
      const index = Math.floor(Math.random() * questions.length);
      !indices.includes(index) && indices.push(index);
    }
    return indices;
  }

  initializeQuestions = uninitializedQuestions => {
    const initializedQuestions = uninitializedQuestions.map(question => {
      const initializedQuestion = question;
      initializedQuestion.answered = false;
      return initializedQuestion;
    });
    this.setState({ selectedQuestions: initializedQuestions })
  }

  incrementScore = () => {
    this.setState(prevState => {
      return { score: ++prevState.score }
    });
  }

  setQuestionAnswered = question => {
    const answeredQuestion = { ...question };
    answeredQuestion.answered = true;
    this.setState(prevState => {
      return { selectedQuestions: prevState.selectedQuestions.map(question => {
        return (question.text === answeredQuestion.text) ? answeredQuestion : question;
      })}
    });
  }

  allQuestionsAreAnswered = () => {
    const unansweredQuestion = this.state.selectedQuestions.find(question => {
      return question.answered === false;
    });
    return unansweredQuestion ? false : true;
  }

  submitScore = name => {
    const newScore = {
      name: name,
      score: this.state.score
    }
    this.setState(prevState => {
      return {
        hiscores: [ ...prevState.hiscores, newScore]
      }
    });
  }

}

export default App;
