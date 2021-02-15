import accountService from '../services/account.js';
import authService from '../services/auth.js';

export default function (app) {
  app.post('/api/signup', (req, res) => {
    accountService.signup(req.body.formData).then((result) => {
      res.send(result);
    });
  });

  app.post('/api/login', (req, res) => {
    accountService.login(req.body.username, req.body.password).then((result) => {
      res.send(result);
    });
  });

  app.get('/api/check-phone-exists', (req, res) => {
    authService.checkPhoneExists(req.query.phoneNumber).then((exists) => {
      res.send({ exists: exists });
    });
  });

  app.get('/api/check-email-exists', (req, res) => {
    authService.checkEmailExists(req.query.email).then((exists) => {
      res.send({ exists: exists });
    });
  });

  app.get('/api/check-username-exists', (req, res) => {
    authService.checkUsernameExists(req.query.username).then((exists) => {
      res.send({ exists: exists });
    });
  });
}
