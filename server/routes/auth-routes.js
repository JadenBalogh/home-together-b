import verificationService from '../services/verification.js';

export default function (app) {
  // Expects: /get-members?genderId=2&minAge=21&maxAge=80&familyStatusId=1&maxMonthlyBudget=800
  app.post('/signup', (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    verificationService.checkAvailable(username, email).then((available) => {
      console.log(available);
      res.send(available);
    });
  });
}
