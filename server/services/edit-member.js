import dbutils from '../helpers/dbutils.js';

// This will return information on a selected user but does not handle the authentication
// Currently it will simply return the information on the username passed to it.

function getMember(username) {
  var iD = getMemberId(username)
  return new Promise((resolve) => {
    var sql = 'SELECT * FROM Member JOIN SearchableInfo ON SearchableInfo.memberId = Member.id WHERE id = ?';
    dbutils.query(sql, [iD]).then((results) => {
      let filteredResults = results;
      // TODO: Impliment results filtering (Strip out Username & Password from results)
      resolve(filteredResults);
    });
  });
}

// Selects the MemberID based on their username
function getMemberId(username) {
  var sql = 'SELECT id FROM Member WHERE username = ?';
  return (dbutils.query(sql, [username]));
}

export default {
  getMember,
  getMemberId
};
