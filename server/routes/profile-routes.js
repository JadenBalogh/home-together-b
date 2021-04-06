import profileService from '../services/profile.js';

export default function (app) {
  app.get('/api/get-member', (req, res) => {
    profileService.getMember(req.query.id).then((member) => res.send(member));
  });

  app.get('/api/get-business', (req, res) => {
    profileService.getBusiness(req.query.id).then((business) => res.send(business));
  });

  app.post('/api/edit-profile', (req, res) => {
    profileService.editMember(req.body.id, req.body.formData).then(() => res.end());
  });

  app.post('/api/edit-business-profile', (req, res) => {
    profileService.editOrganization(req.body.id, req.body.formData).then(() => res.end());
  });
}
