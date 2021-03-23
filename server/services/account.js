import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dbutils from '../helpers/dbutils.js';
import authService from './auth.js';
import authConfig from '../config/authconfig.js';

const SQL_INSERT_MEMBER = `
  INSERT INTO Member(
    firstName,
    lastName,
    homeAddress,
    mailAddress,
    phoneNumber,
    email,
    username,
    password)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

const SQL_INSERT_BUSINESS = `
  INSERT INTO Organization(
    verified,
    registrationDate,
    incorporated,
    incorporatedName,
    incorporatedOwners,
    contactFirstName,
    contactLastName,
    contactEmail,
    contactPhone,
    username,
    password,
    organizationName,
    organizationWebsite,
    organizationLogoURL,
    organizationMainPhone,
    organizationEmail,
    national,
    organizationStreetAddress,
    organizationMailingAddress)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const SQL_INSERT_SEARCHABLE_INFO = `
  INSERT INTO SearchableInfo(
    memberId,
    genderId,
    birthYear,
    familyStatusId,
    minMonthlyBudget,
    maxMonthlyBudget,
    petRestrictions,
    petRestrictionsText,
    healthRestrictions,
    healthRestrictionsText,
    religionRestrictions,
    religionRestrictionsText,
    smokingRestrictions,
    smokingRestrictionsText,
    dietRestrictions,
    dietRestrictionsText,
    allergies,
    allergiesText,
    hasHousing,
    minHomeCapacity,
    maxHomeCapacity,
    housingDescription,
    profileText)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const SQL_INSERT_LOCATION_PREFERENCE = `INSERT INTO LocationPreference(memberId, locationId) VALUES (?, ?)`;

const SQL_SELECT_MEMBER = `SELECT id, username, password FROM Member WHERE username = ?`;

const SQL_SELECT_ORGANIZATION = `SELECT id, username, password FROM Organization WHERE username = ?`;

async function signup(data) {
  let available = await authService.checkAvailable(data.username, data.email);
  if (!available) {
    return { err: 'Credentials unavailable.' };
  }

  console.log(data);

  // Insert Member
  let pwHash = bcrypt.hashSync(data.password);
  let result = await dbutils.query(SQL_INSERT_MEMBER, [
    data.firstName,
    data.lastName,
    data.homeAddress,
    data.mailAddress,
    data.phoneNumber,
    data.email,
    data.username,
    pwHash,
  ]);
  let memberId = result.insertId;

  console.log('passed step 1');

  // Insert SearchableInfo
  await dbutils.query(SQL_INSERT_SEARCHABLE_INFO, [
    memberId,
    data.genderId,
    data.birthYear,
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
  ]);

  console.log('passed step 2');

  // Insert LocationPreferences
  for (const locationId of data.locationIds) {
    await dbutils.query(SQL_INSERT_LOCATION_PREFERENCE, [memberId, locationId]);
  }

  return { success: true };
}

async function businessSignup(data) {
  let available = await authService.checkBusinessAvailable(data.username, data.organizationEmail);
  if (!available) {
    return { err: 'Credentials unavailable.' };
  }

  console.log(data);

  // Insert Organization
  let pwHash = bcrypt.hashSync(data.password);
  let result = await dbutils.query(SQL_INSERT_BUSINESS, [
    data.verified,
    new Date(),
    data.incorporated,
    data.incorporatedName,
    data.contactFirstName,
    data.contactLastName,
    data.contactEmail,
    data.contactPhone,
    data.username,
    pwHash,
    data.organizationName,
    data.organizationWebsite,
    data.organizationLogoURL,
    data.organizationMainPhone,
    data.organizationEmail,
    data.national,
    data.organizationStreetAddress,
    data.organizationMailingAddress,
  ]);

  console.log('passed step 1');

  return { success: true };
}

async function login(username, password) {
  let members = await dbutils.query(SQL_SELECT_MEMBER, [username]);
  let user = members[0];
  let accountType = 0;

  if (!user) {
    let organizations = await dbutils.query(SQL_SELECT_ORGANIZATION, [username]);
    user = organizations[0];
    accountType = 1;

    if (!user) return { err: 'User not found.' };
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return { err: 'Invalid password.' };
  }

  let token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: 86400 });
  return {
    id: user.id,
    username: user.username,
    accountType,
    accessToken: token,
  };
}

export default {
  signup,
  businessSignup,
  login,
};
