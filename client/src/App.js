import React, { Component } from 'react';
import './App.css';

class ServerInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      response: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit() {
    const options = {
      method: 'POST',
      body: JSON.stringify({ data: this.state.value }),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(process.env.REACT_APP_SERVER_URL, options)
      .then(res => res.text())
      .then(txt => {
        this.setState({
          response: txt
        });
      });
  }

  render() {
    return (
      <div>
        <p>
          <input type='text' value={this.state.value} onChange={this.handleChange} />
          <button onClick={this.handleSubmit}>Submit</button>
        </p>
        {this.state.response}
      </div>
    );
  }
}

function App() {
  return (
    <div className='App'>
      <h1>Hello World</h1>
      <p>Enter a string and the server will return the uppercase result:</p>
      <ServerInput />
    </div>
  );
}

export default App;
