import searchService from '../services/search.js';

export default function (app) {
  // Expects: /get-members?genderId=2&minAge=21&maxAge=80&familyStatusId=1&maxMonthlyBudget=800
  app.get('/get-members', (req, res) => {
    searchService
      .getMembers(req.query.genderIds, req.query.ageGroupIds, req.query.familyStatusIds, req.query.maxMonthlyBudget)
      .then((members) => {
        res.send(members);
      });
  });

  // Expects: /get-listings?category=Rentals
  app.get('/get-listings', (req, res) => {
    searchService.getListings(req.query.categoryId).then((listings) => {
      res.send(listings);
    });
  });

  // Expects: /get-gender-types
  app.get('/get-gender-types', (req, res) => {
    searchService.getGenderTypes().then((genders) => {
      res.send(genders);
    });
  });

  // Expects: /get-family-status-types
  app.get('/get-family-status-types', (req, res) => {
    searchService.getFamilyStatusTypes().then((familyStatuses) => {
      res.send(familyStatuses);
    });
  });

  // Expects: /get-age-group-types
  app.get('/get-age-group-types', (req, res) => {
    searchService.getAgeGroupTypes().then((ageGroups) => {
      res.send(ageGroups);
    });
  });

  // Expects: /get-category-types
  app.get('/get-category-types', (req, res) => {
    searchService.getCategoryTypes().then((categories) => {
      res.send(categories);
    });
  });
}
