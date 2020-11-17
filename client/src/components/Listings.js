import React, { Component } from 'react';
import '../index.css';

// Search page for members
class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      category: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const options = {
      method: 'GET',
    };
    const route = '/get-listings?';
    const params = new URLSearchParams(
      `category=${this.state.category}`
    ).toString();
    const url = process.env.REACT_APP_SERVER_URL + route + params;

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          listings: json,
        });
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Listings Page</h1>
        <p>Category: <input type='text' name='category' value={this.state.category} onChange={this.handleChange} /></p>
        <input type='submit'></input>
      </form>
    );
  }
}

export default Listings;
