import dbutils from '../helpers/dbutils.js';

const SQL_SELECT_MEMBERS = `
  SELECT
    m.id AS id,
    m.firstName AS firstName,
    m.lastName AS lastName,
    g.id AS genderId,
    g.name AS gender,
    f.id AS familyStatusId,
    f.name AS familyStatus,
    s.minMonthlyBudget,
    s.maxMonthlyBudget,
    s.petRestrictions,
    s.religionRestrictions,
    s.smokingRestrictions,
    s.hasHousing,
    s.minHomeCapacity,
    s.maxHomeCapacity,
    s.birthYear
  FROM SearchableInfo s
  JOIN Member m ON m.id = s.memberID
  JOIN GenderType g ON g.id = s.genderId
  JOIN FamilyStatusType f ON f.id = s.familyStatusId
  WHERE
    s.minMonthlyBudget <= ? AND
    s.maxMonthlyBudget >= ? AND
    s.petRestrictions = ? AND
    s.religionRestrictions = ? AND
    s.smokingRestrictions = ? AND
    s.hasHousing = ? AND
    s.minHomeCapacity <= ? AND
    s.maxHomeCapacity >= ?
`;

const SQL_SELECT_LISTINGS = `
  SELECT
    l.id AS id,
    approvalStatus,
    creationDate,
    title,
    website,
    phone,
    email,
    ratingAverage,
    ratingCount,
    startDate,
    endDate,
    description,
    c.id AS categoryId,
    c.name AS categoryName,
    o.id AS organizationId,
    o.organizationName AS organizationName
  FROM Listing l
  JOIN CategoryType c ON l.categoryId = c.id
  JOIN Organization o ON l.organizationId = o.id
`;

function getAgeRanges(ageGroupIds) {
  var placeholders = ageGroupIds.length > 0 ? ageGroupIds.map(() => '?').join(',') : '-1';
  var sql = `SELECT minAge, maxAge FROM AgeGroupType WHERE id IN (${placeholders})`;
  return dbutils.query(sql, [...ageGroupIds]);
}

function getLocationPreferences(memberId) {
  var sql = `SELECT locationId FROM LocationPreference WHERE memberId = ?`;
  return dbutils.query(sql, [memberId]);
}

async function getMembers(filters) {
  let genderIds = Array.from(filters.genderIds);
  let ageGroupIds = Array.from(filters.ageGroupIds);
  let familyStatusIds = Array.from(filters.familyStatusIds);
  let locationIds = Array.from(filters.locationIds);

  let results = await dbutils.query(SQL_SELECT_MEMBERS, [
    filters.maxMonthlyBudget,
    filters.minMonthlyBudget,
    filters.petRestrictions,
    filters.religionRestrictions,
    filters.smokingRestrictions,
    filters.hasHousing,
    filters.maxHomeCapacity,
    filters.minHomeCapacity,
  ]);

  // Manually do the filtering for the array-based parameters cause prepared statements suck at dealing with this
  let isGenderMatch = (member) => genderIds.length === 0 || genderIds.includes(member.genderId);

  let isFamilyStatusMatch = (member) => familyStatusIds.length === 0 || familyStatusIds.includes(member.familyStatusId);

  // Check if the member's birth year is within any of the given age ranges
  let year = new Date().getFullYear();
  let ageRanges = await getAgeRanges(ageGroupIds);
  let isAgeMatch = (member) =>
    ageRanges.length === 0 ||
    ageRanges.some((ageRange) => {
      let minYear = year - Number(ageRange.maxAge);
      let maxYear = year - Number(ageRange.minAge);
      return minYear <= member.birthYear && maxYear >= member.birthYear;
    });

  // Check if any of the member's location preferences match any of the location filters
  let isLocationMatch = async (member) => {
    let prefs = await getLocationPreferences(member.id);
    return locationIds.length === 0 || locationIds.some((id) => prefs.some((pref) => pref.locationId === id));
  };

  let filteredResults = await results.filter(async (member) => {
    let match = await isLocationMatch(member);
    return isGenderMatch(member) && isFamilyStatusMatch(member) && isAgeMatch(member) && match;
  });

  return filteredResults;
}

function getListings(categoryId) {
  return new Promise((resolve) => {
    dbutils.query(SQL_SELECT_LISTINGS).then((results) => {
      let filteredResults = results;
      if (categoryId > 0) {
        filteredResults = results.filter((x) => x.categoryId == categoryId);
      }
      resolve(filteredResults);
    });
  });
}

function getGenderTypes() {
  return dbutils.query('SELECT id, name FROM GenderType');
}

function getFamilyStatusTypes() {
  return dbutils.query('SELECT id, name FROM FamilyStatusType');
}

function getAgeGroupTypes() {
  return dbutils.query('SELECT id, name, minAge, maxAge FROM AgeGroupType');
}

function getCategoryTypes() {
  return dbutils.query('SELECT id, name FROM CategoryType');
}

function getLocations() {
  return dbutils.query(`SELECT id, city, province_name, postal FROM Location`);
}

export default {
  getMembers,
  getListings,
  getGenderTypes,
  getFamilyStatusTypes,
  getAgeGroupTypes,
  getCategoryTypes,
  getLocations,
};
