import authService from '../services/auth.js';

export default function (app) {
  app.get('/api/check-phone-exists', (req, res) => {
    authService.checkPhoneExists(req.query.phoneNumber).then((exists) => {
      res.send({ exists: exists });
    });
  });

  app.get('/api/check-business-phone-exists', (req, res) => {
    authService.checkBusinessPhoneExists(req.query.phoneNumber).then((exists) => {
      res.send({ exists: exists });
    });
  });

  app.get('/api/check-email-exists', (req, res) => {
    authService.checkEmailExists(req.query.email).then((exists) => {
      res.send({ exists: exists });
    });
  });

  app.get('/api/check-business-email-exists', (req, res) => {
    authService.checkBusinessEmailExists(req.query.email).then((exists) => {
      res.send({ exists: exists });
    });
  });

  app.get('/api/check-username-exists', (req, res) => {
    authService.checkUsernameExists(req.query.username).then((exists) => {
      res.send({ exists: exists });
    });
  });
}
