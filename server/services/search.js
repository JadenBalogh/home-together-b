import dbutils from '../helpers/dbutils.js';

function getAgeRanges(ageGroupIds) {
  var placeholders = ageGroupIds.length > 0 ? ageGroupIds.map(() => '?').join(',') : '-1';
  var sql = `SELECT minAge, maxAge
    FROM AgeGroupType
    WHERE id IN (${placeholders})`;
  return dbutils.query(sql, [...ageGroupIds]);
}

function getMembers(genderIds = [], ageGroupIds = [], familyStatusIds = [], maxMonthlyBudget = 0) {
  genderIds = Array.from(genderIds);
  ageGroupIds = Array.from(ageGroupIds);
  familyStatusIds = Array.from(familyStatusIds);

  var sql =
    'SELECT \
      m.id AS id, \
      m.firstName AS firstName, \
      m.lastName AS lastName, \
      g.id AS genderId, \
      g.name AS gender, \
      f.id AS familyStatusId, \
      f.name AS familyStatus, \
      s.maxMonthlyBudget AS maxMonthlyBudget, \
      s.birthYear as birthYear \
    FROM SearchableInfo s \
    JOIN Member m ON m.id = s.memberID \
    JOIN GenderType g ON g.id = s.genderId \
    JOIN FamilyStatusType f ON f.id = s.familyStatusId \
    WHERE s.maxMonthlyBudget >= ?';

  return new Promise((resolve) => {
    dbutils.query(sql, [maxMonthlyBudget]).then((results) => {
      // Manually do the filtering for the array-based parameters
      // cause prepared statements suck at dealing with this
      var year = new Date().getFullYear();
      getAgeRanges(ageGroupIds).then((ageRanges) => {
        let filteredResults = results.filter((x) => {
          let doesGenderMatch = genderIds.length > 0 ? genderIds.includes(x.genderId.toString()) : true;

          let doesFamilyMatch =
            familyStatusIds.length > 0 ? familyStatusIds.includes(x.familyStatusId.toString()) : true;

          let doesAgeMatch =
            ageRanges.length > 0
              ? ageRanges.some((ageRange) => {
                  return year - Number(ageRange.minAge) >= x.birthYear && year - Number(ageRange.maxAge) <= x.birthYear;
                })
              : true;

          return doesGenderMatch && doesFamilyMatch && doesAgeMatch;
        });

        resolve(filteredResults);
      });
    });
  });
}

function getListings(categoryId) {
  return new Promise((resolve) => {
    var sql =
      'SELECT \
        l.id, \
        title, \
        website, \
        phone, \
        email, \
        c.id AS categoryId, \
        c.name AS categoryName \
      FROM Listing l \
      JOIN CategoryType c ON l.categoryId = c.id';
    dbutils.query(sql).then((results) => {
      let filteredResults = results;
      if (categoryId > 0) {
        filteredResults = results.filter((x) => x.categoryId == categoryId);
      }
      resolve(filteredResults);
    });
  });
}

function getGenderTypes() {
  var sql = 'SELECT id, name \
    FROM GenderType';
  return dbutils.query(sql);
}

function getFamilyStatusTypes() {
  var sql = 'SELECT id, name \
    FROM FamilyStatusType';
  return dbutils.query(sql);
}

function getAgeGroupTypes() {
  var sql = 'SELECT id, name, minAge, maxAge \
    FROM AgeGroupType';
  return dbutils.query(sql);
}

function getCategoryTypes() {
  var sql = 'SELECT id, name \
    FROM CategoryType';
  return dbutils.query(sql);
}

export default {
  getAgeRanges,
  getMembers,
  getListings,
  getGenderTypes,
  getFamilyStatusTypes,
  getAgeGroupTypes,
  getCategoryTypes,
};
