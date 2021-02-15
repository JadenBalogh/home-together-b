import searchService from '../services/search.js';

export default function (app) {
  app.post('/api/get-members', (req, res) => {
    searchService.getMembers(req.body.filters).then((members) => {
      res.send(members);
    });
  });

  app.get('/api/get-listings', (req, res) => {
    searchService.getListings(req.query.categoryId).then((listings) => {
      res.send(listings);
    });
  });

  app.get('/api/get-gender-types', (req, res) => {
    searchService.getGenderTypes().then((genders) => {
      res.send(genders);
    });
  });

  app.get('/api/get-family-status-types', (req, res) => {
    searchService.getFamilyStatusTypes().then((familyStatuses) => {
      res.send(familyStatuses);
    });
  });

  app.get('/api/get-age-group-types', (req, res) => {
    searchService.getAgeGroupTypes().then((ageGroups) => {
      res.send(ageGroups);
    });
  });

  app.get('/api/get-category-types', (req, res) => {
    searchService.getCategoryTypes().then((categories) => {
      res.send(categories);
    });
  });

  app.get('/api/get-locations', (req, res) => {
    searchService.getLocations().then((locations) => {
      res.send(locations);
    });
  });
}
