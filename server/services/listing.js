import dbutils from '../helpers/dbutils.js';

const SQL_SELECT_LISTINGS_BY_USER = `
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
  WHERE o.id = ?
`;

async function getListingsByUser(id) {
  return await dbutils.query(SQL_SELECT_LISTINGS_BY_USER, [id]);
}

export default {
  getListingsByUser,
};
