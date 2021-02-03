const SQL_EDIT_MEMBER = `INSERT INTO Member(
    firstName, 
    lastName, 
    homeAddress,
    mailAddress,
    email)
    VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE`;

    // TODO: Do additonal testing with the "ON DUPLICATE KEY UPDATE" functionality.
const SQL_EDIT_SEARCHABLE_INFO = `INSERT INTO SearchableInfo(
    memberId, 
    genderId, 
    birthYear, 
    familyStatusId, 
    maxMonthlyBudget,
    petRestrictions, 
    petRestrictionsText, 
    healthRestrictions, 
    healthRestrictionsText,
    religionRestrictions, 
    religionRestrictionsText, 
    smokingRestrictions, 
    smokingRestrictionsText,
    dietRestrictions, 
    dietRestrictionsText, 
    allergies, 
    allergiesText,
    hasHousing, 
    housingDescription, 
    profileText)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATES`;

export default function (app) {
    // Expects: /get-member?username=larry123
    app.get('/get-member', (req, res) => {
        searchService
            .getMember(req.query.username)
            .then((member) => {
                res.send(member);
            });
    });

    app.post('/editprofile', (req, res) => {
        let data = req.body.formData;
        dbutils
            .query(SQL_EDIT_MEMBER, [
                data.firstName,
                data.lastName,
                data.homeAddress,
                data.mailAddress,
                data.email,
            ])
            .then((result) => {
                let id = result.insertId;

                dbutils
                    .query(SQL_EDIT_SEARCHABLE_INFO, [
                        id,
                        data.genderId,
                        data.birthYear,
                        data.familyStatusId,
                        data.maxMonthlyBudget,
                        data.petRestrictions,
                        data.petRestrictionsText,
                        data.healthRestrictions,
                        data.healthRestrictionsText,
                        data.religionRestrictions,
                        data.religionRestrictionsText,
                        data.smokingRestrictions,
                        data.smokingRestrictionsText,
                        data.dietRestrictions,
                        data.dietRestrictionsText,
                        data.allergies,
                        data.allergiesText,
                        data.hasHousing,
                        data.housingDescription,
                        data.profileText,
                    ])
                    .then(() => res.end());
            });
    });
}

