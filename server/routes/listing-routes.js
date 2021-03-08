import listingService from '../services/listing.js';

export default function (app) {
  app.get('/api/get-listings-by-user', (req, res) => {
    listingService.getListingsByUser(req.query.id).then((listings) => res.send(listings));
  });

  app.get('/api/get-listing', (req, res) => {
    listingService.getListing(req.query.id).then((listing) => res.send(listing));
  });
}
