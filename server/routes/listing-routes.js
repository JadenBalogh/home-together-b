import listingService from '../services/listing.js';

export default function (app) {
  app.get('/api/get-listings-by-user', (req, res) => {
    listingService.getListingsByUser(req.query.id).then((listings) => res.send(listings));
  });

  app.get('/api/get-listing', (req, res) => {
    listingService.getListing(req.query.id).then((listing) => res.send(listing));
  });

  app.post('/api/create-listing', (req, res) => {
    listingService.createListing(req.body.listing).then((result) => res.send(result));
  });

  app.post('/api/edit-listing', (req, res) => {
    listingService.editListing(req.body.id, req.body.listing).then(() => res.end());
  });
}
