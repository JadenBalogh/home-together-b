import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authconfig from '../config/authconfig.js';
import authService from '../services/auth.js';
import dbutils from '../helpers/dbutils.js';

const SQL_INSERT_MEMBER = `INSERT INTO Member(
  firstName, lastName, homeAddress, mailAddress, email, username, password)
  VALUES (?, ?, ?, ?, ?, ?, ?)`;

const SQL_INSERT_SEARCHABLE_INFO = `INSERT INTO SearchableInfo(
  memberId, genderId, birthYear, familyStatusId, maxMonthlyBudget,
  petRestrictions, petRestrictionsText, healthRestrictions, healthRestrictionsText,
  religionRestrictions, religionRestrictionsText, smokingRestrictions, smokingRestrictionsText,
  dietRestrictions, dietRestrictionsText, allergies, allergiesText,
  hasHousing, housingDescription, profileText)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

export default function (app) {
  app.post('/api/signup', (req, res) => {
    let data = req.body.formData;

    authService.checkAvailable(data.username, data.email).then((available) => {
      if (!available) {
        res.send({ err: 'Credentials unavailable.' });
        return;
      }

      let pwHash = bcrypt.hashSync(data.password);
      dbutils
        .query(SQL_INSERT_MEMBER, [
          data.firstName,
          data.lastName,
          data.homeAddress,
          data.mailAddress,
          data.email,
          data.username,
          pwHash,
        ])
        .then((result) => {
          let id = result.insertId;

          dbutils
            .query(SQL_INSERT_SEARCHABLE_INFO, [
              id,
              data.genderId,
              data.birthYear,
              data.familyStatusId,
              data.maxMonthlyBudget,
              data.petRestrictions,
              data.petRestrictionsText,
              data.healthRestrictions,
              data.healthRestrictionsText,
              data.religionRestrictions,
              data.religionRestrictionsText,
              data.smokingRestrictions,
              data.smokingRestrictionsText,
              data.dietRestrictions,
              data.dietRestrictionsText,
              data.allergies,
              data.allergiesText,
              data.hasHousing,
              data.housingDescription,
              data.profileText,
            ])
            .then(() => res.end());
        });
    });
  });

  app.post('/api/login', (req, res) => {
    let username = req.body.username;

    let sql = `SELECT id, username, password FROM Member WHERE username = ?`;
    dbutils.query(sql, [username]).then((results) => {
      let user = results[0];
      if (!user) {
        res.send({ err: 'User not found.' });
        return;
      }

      let password = req.body.password;
      if (!bcrypt.compareSync(password, user.password)) {
        res.send({ err: 'Invalid password.' });
        return;
      }

      let token = jwt.sign({ id: user.id }, authconfig.secret, { expiresIn: 86400 });
      res.send({
        id: user.id,
        username: user.username,
        accessToken: token,
      });
    });
  });
}
