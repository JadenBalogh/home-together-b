import listingService from '../services/listing.js';

export default function (app) {
  app.get('/api/get-listings-by-user', (req, res) => {
    listingService.getListingsByUser(req.query.id).then((listings) => res.send(listings));
  });
}
