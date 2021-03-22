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
    s.maxHomeCapacity >= ? AND (
      m.firstName LIKE ? OR
      m.lastName LIKE ?
    )
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
    locationId,
    c.id AS categoryId,
    c.name AS categoryName,
    o.id AS organizationId,
    o.organizationName AS organizationName
  FROM Listing l
  JOIN CategoryType c ON l.categoryId = c.id
  JOIN Organization o ON l.organizationId = o.id
  WHERE ratingAverage >= ? AND ratingAverage <= ?
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
  let results = await dbutils.query(SQL_SELECT_MEMBERS, [
    filters.maxMonthlyBudget || Number.MAX_SAFE_INTEGER,
    filters.minMonthlyBudget || 0,
    filters.petRestrictions,
    filters.religionRestrictions,
    filters.smokingRestrictions,
    filters.hasHousing,
    filters.maxHomeCapacity || Number.MAX_SAFE_INTEGER,
    filters.minHomeCapacity || 0,
    `%${filters.firstName}%`,
    `%${filters.lastName}%`,
  ]);

  // Manually do the filtering for the array-based parameters cause prepared statements suck at dealing with this
  let isGenderMatch = (member) => filters.genderIds.length === 0 || filters.genderIds.includes(member.genderId);

  let isFamilyStatusMatch = (member) =>
    filters.familyStatusIds.length === 0 || filters.familyStatusIds.includes(member.familyStatusId);

  // Check if the member's birth year is within any of the given age ranges
  let year = new Date().getFullYear();
  let ageRanges = await getAgeRanges(filters.ageGroupIds);
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
    return (
      filters.locationIds.length === 0 || filters.locationIds.some((id) => prefs.some((pref) => pref.locationId === id))
    );
  };

  let filterMembers = async (members) => {
    let result = [];
    for (let m of members) {
      let locationMatch = await isLocationMatch(m);
      if (isGenderMatch(m) && isFamilyStatusMatch(m) && isAgeMatch(m) && locationMatch) {
        result.push(m);
      }
    }
    return result;
  };

  return await filterMembers(results);
}

async function getListings(categoryId, filters) {
  let results = await dbutils.query(SQL_SELECT_LISTINGS, [
    filters.minRating || 0,
    filters.maxRating || Number.MAX_SAFE_INTEGER,
  ]);

  let isCategoryMatch = (listing) => categoryId === '' || listing.categoryId === categoryId;

  let isTitleMatch = (listing) => filters.title === '' || `${listing.title}`.includes(filters.title);

  let isLocationMatch = (listing) =>
    filters.locationIds.length === 0 || filters.locationIds.some((id) => id === listing.locationId);

  let filterListings = (listings) => {
    return listings.filter((l) => isCategoryMatch(l) && isTitleMatch(l) && isLocationMatch(l));
  };

  return filterListings(results);
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
  return dbutils.query('SELECT id, parentId, name, paymentRequired FROM CategoryType');
}

function getLocations() {
  return dbutils.query(`SELECT id, city, province_id, province_name, postal FROM Location`);
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
