import authService from '../services/auth.js';

export default function (app) {
  app.post('/signup', (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    authService.checkAvailable(username, email).then((available) => {
      if (!available) res.send({ err: 'Credentials unavailable.' });
      
      
    });
  });
}
