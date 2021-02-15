import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dbutils from '../helpers/dbutils.js';
import authService from '../config/authconfig.js';

const SQL_INSERT_MEMBER = `INSERT INTO Member(
  firstName, lastName, homeAddress, mailAddress, phoneNumber, email, username, password)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

const SQL_INSERT_SEARCHABLE_INFO = `INSERT INTO SearchableInfo(
  memberId, genderId, birthYear, familyStatusId, minMonthlyBudget, maxMonthlyBudget,
  petRestrictions, petRestrictionsText, healthRestrictions, healthRestrictionsText,
  religionRestrictions, religionRestrictionsText, smokingRestrictions, smokingRestrictionsText,
  dietRestrictions, dietRestrictionsText, allergies, allergiesText,
  hasHousing, minHomeCapacity, maxHomeCapacity, housingDescription, profileText)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

function signup(data) {
  return new Promise((resolve, reject) => {
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
          data.phoneNumber,
          data.email,
          data.username,
          pwHash,
        ])
        .then((result) => {
          let id = result.insertId;
          console.log(id);

          dbutils
            .query(SQL_INSERT_SEARCHABLE_INFO, [
              id,
              data.genderId,
              404,
              data.familyStatusId,
              data.minMonthlyBudget,
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
              data.minHomeCapacity,
              data.maxHomeCapacity,
              data.housingDescription,
              data.profileText,
            ])
            .then(() => resolve())
            .catch((reason) => {
              console.log(reason);
              reject(reason);
            });
        })
        .catch((reason) => {
          console.log(reason);
          reject(reason);
        });
    });
  });
}

function login(username, password) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT id, username, password FROM Member WHERE username = ?`;
    dbutils
      .query(sql, [username])
      .then((results) => {
        let user = results[0];
        if (!user) {
          res.send({ err: 'User not found.' });
          return;
        }

        if (!bcrypt.compareSync(password, user.password)) {
          res.send({ err: 'Invalid password.' });
          return;
        }

        let token = jwt.sign({ id: user.id }, authconfig.secret, { expiresIn: 86400 });
        resolve({
          id: user.id,
          username: user.username,
          accessToken: token,
        });
      })
      .catch((reason) => {
        console.log(reason);
        reject(reason);
      });
  });
}

export default {
  signup,
  login,
};
