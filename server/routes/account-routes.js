import accountService from '../services/account.js';

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
}
