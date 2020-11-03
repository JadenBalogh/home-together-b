import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import MemberList from './MemberList';

class MemberListClass extends React.Component {
  constructor(props) {
      super(props);
      this.state = { total: 0 }
      var rows = props.data;
      var queriedResult = [];
      this.isClicked = this.isClicked.bind(this);
      this.memberQuery = this.memberQuery.bind(this);
  }

  createMemberData(id, username, gender, age) {
      return { id, username, gender, age };
  }

  memberQuery() {//!!!Currently unused!!!
      var mysql = require('mysql');

      //Connection information
      var con = mysql.createConnection({
          host: "localhost",
          user: "test",
          password: "Test!1"
      });

      con.connect(function (err) {
          if (err) throw err;
          console.log("Connected.")
          //Queries done here
          con.query("SELECT * FROM MEMBERS", function (err, result) {
              if (err) throw err;
              Object.keys(result).forEach(function (key) {
                  this.queriedResult = result[key];
              });
          })
      });
  }

  isClicked() {
      this.setState(state => ({ butText: "updt" }));
      this.queriedResult = [
          this.createMemberData(0, 'testUser1', 'F', 32),
          this.createMemberData(1, 'testUser2', 'M', 24),
          this.createMemberData(2, 'testUser3', 'F', 62),
          this.createMemberData(3, 'testUser4', 'M', 45),
          this.createMemberData(4, 'testUser5', 'F', 84),
          this.createMemberData(5, 'testUser6', 'M', 27),
      ];

  }

  render() {
      return (
          <div>
              <MemberList data={this.queriedResult} />
              <button onClick={this.isClicked}>
                  {"Test query"}
              </button>
          </div>
      );
  }

}

function App() {
  return (
    <div className='App'>
      <MemberListClass/>
    </div>
  );
}

export default App;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
