import React, { PureComponent } from 'react';

export class ScoreForm extends PureComponent {
  state = {
    name: ""
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.name} onChange={this.handleChange} />
        <input type="submit" value="Submit Score" />
      </form>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.submitScore(this.state.name);
    this.setState({ name: "" });
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  }
}

export default ScoreForm;
