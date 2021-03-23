import dbutils from '../helpers/dbutils.js';

const SQL_SELECT_MEMBER = `
  SELECT
    firstName,
    lastName,
    homeAddress,
    mailAddress,
    email,
    phoneNumber,
    genderId,
    g.name AS gender,
    birthYear,
    familyStatusId,
    f.name AS familyStatus,
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
    profileText
  FROM Member m
  JOIN SearchableInfo s ON m.id = s.memberID
  JOIN GenderType g ON g.id = s.genderId
  JOIN FamilyStatusType f ON f.id = s.familyStatusId
  WHERE m.id = ?
`;

const SQL_SELECT_ORGANIZATION = `
  SELECT
    verified,
    incorporated,
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
    organizationMailingAddress
  FROM Organization
  WHERE id = ?
`;

const SQL_UPDATE_MEMBER = `
  UPDATE Member
  SET
    firstName = ?, 
    lastName = ?, 
    homeAddress = ?,
    mailAddress = ?,
    phoneNumber = ?,
    email = ?
  WHERE id = ?
`;

const SQL_UPDATE_SEARCHABLE_INFO = `
  UPDATE SearchableInfo
  SET
    genderId = ?,
    birthYear = ?,
    familyStatusId = ?,
    minMonthlyBudget = ?,
    maxMonthlyBudget = ?,
    petRestrictions = ?,
    petRestrictionsText = ?,
    healthRestrictions = ?,
    healthRestrictionsText = ?,
    religionRestrictions = ?,
    religionRestrictionsText = ?,
    smokingRestrictions = ?,
    smokingRestrictionsText = ?,
    dietRestrictions = ?,
    dietRestrictionsText = ?,
    allergies = ?,
    allergiesText = ?,
    hasHousing = ?,
    minHomeCapacity = ?,
    maxHomeCapacity = ?,
    housingDescription = ?,
    profileText = ?
  WHERE memberId = ?
`;

const SQL_UPDATE_ORGANIZATION = `
  UPDATE Organization
  SET
    verified = ?,
    incorporated = ?,
    contactFirstName = ?,
    contactLastName = ?,
    contactEmail = ?,
    contactPhone = ?,
    organizationName = ?,
    organizationWebsite = ?,
    organizationLogoURL = ?,
    organizationMainPhone = ?,
    organizationEmail = ?,
    national = ?,
    organizationStreetAddress = ?,
    organizationMailingAddress = ?
  WHERE id = ?
`;

const SQL_DELETE_LOCATION_PREFERENCE = `DELETE FROM LocationPreference WHERE memberId = ?`;

const SQL_INSERT_LOCATION_PREFERENCE = `INSERT INTO LocationPreference(memberId, locationId) VALUES (?, ?)`;

function getMember(id) {
  return new Promise((resolve) => {
    dbutils.query(SQL_SELECT_MEMBER, [id]).then((results) => {
      let member = results[0];
      dbutils.query('SELECT locationId FROM LocationPreference WHERE memberId = ?', [id]).then((locations) => {
        member.locationIds = locations.map((x) => x.locationId);
        resolve(member);
      });
    });
  });
}

function getBusiness(id) {
  return new Promise((resolve) => {
    dbutils.query(SQL_SELECT_ORGANIZATION, [id]).then((results) => {
      resolve(results[0]);
    });
  });
}

async function editMember(id, data) {
  // Update Member
  await dbutils.query(SQL_UPDATE_MEMBER, [
    data.firstName,
    data.lastName,
    data.homeAddress,
    data.mailAddress,
    data.phoneNumber,
    data.email,
    id,
  ]);

  // Update SearchableInfo
  await dbutils.query(SQL_UPDATE_SEARCHABLE_INFO, [
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
    id,
  ]);

  // Update LocationPreferences
  await dbutils.query(SQL_DELETE_LOCATION_PREFERENCE, [id]);
  for (const locationId of data.locationIds) {
    await dbutils.query(SQL_INSERT_LOCATION_PREFERENCE, [id, locationId]);
  }
}

async function editOrganization(id, data) {
  // Update Organization
  await dbutils.query(SQL_UPDATE_ORGANIZATION, [
    data.verified,
    data.incorporated,
    data.contactFirstName,
    data.contactLastName,
    data.contactEmail,
    data.contactPhone,
    data.organizationName,
    data.organizationWebsite,
    data.organizationLogoURL,
    data.organizationMainPhone,
    data.organizationEmail,
    data.national,
    data.organizationStreetAddress,
    data.organizationMailingAddress,
    id,
  ]);
}
export default {
  getMember,
  getBusiness,
  editMember,
  editOrganization,
};
