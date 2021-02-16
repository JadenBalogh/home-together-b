import profileService from '../services/profile.js';

export default function (app) {
  app.get('/api/get-member', (req, res) => {
    profileService.getMember(req.query.id).then((member) => res.send(member));
  });

  app.post('/api/edit-profile', (req, res) => {
    profileService.editMember(req.body.id, req.body.formData).then(() => res.end());
  });
}
