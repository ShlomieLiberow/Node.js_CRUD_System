var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/StippedV');

router.get('/', function (req, res) {
    var collection = db.get('usercollection');
    collection.find({}, {}, function (err, userList) {
        if (err) throw err;
        res.json(userList);
    });
});

router.post('/', function (req, res) {
    var collection = db.get('usercollection');
    collection.insert({
        title: req.body.title,
        firstname: req.body.firstname,
        surname: req.body.surname,
        suffix: req.body.suffix,
        email: req.body.email,
        facebook: req.body.facebook,
        notes: req.body.notes,
        category: req.body.category,
        introducer: req.body.introducer,
        memberOfAssociation: req.body.memberOfAssociation,
        memberOfCompany: req.body.memberOfCompany,
        membershipCeased: req.body.membershipCeased,
        statusWhenLastSubPaid: req.body.statusWhenLastSubPaid,
        organisation: req.body.organisation,
        positionOrDepartment: req.body.positionOrDepartment,
        occupation: req.body.occupation,
        legalQualificationOrVocation: req.body.legalQualificationOrVocation,
        jurisdictions: req.body.jurisdictions,
        relevantAreasOfLaw: req.body.relevantAreasOfLaw,
        legalResearchInterests: req.body.legalResearchInterests,
        nonLegalTasks: req.body.nonLegalTasks,
        otherProfessionalSpecialisms: req.body.otherProfessionalSpecialisms,
        volunteeringIntent: req.body.volunteeringIntent,
        volunteeringCompleted: req.body.volunteeringCompleted,
        telephone: req.body.telephone,
        address: req.body.address,
        city: req.body.city,
        county: req.body.county,
        state: req.body.state,
        province: req.body.province,
        postcodeORzipCode: req.body.postcodeORzipCode,
        country: req.body.country
    }, function (err, entity) {
        if (err) throw err;

        res.json(entity);
    });
});

router.get('/:id', function (req, res) {
    var collection = db.get('usercollection');
    collection.findOne({_id: req.params.id}, function (err, entity) {
        if (err) throw err;

        res.json(entity);
    });
});

router.put('/:id', function (req, res) {
    var collection = db.get('usercollection');
    collection.update({
            _id: req.params.id
        },
        {
            title: req.body.title,
            firstname: req.body.firstname,
            surname: req.body.surname,
            suffix: req.body.suffix,
            email: req.body.email,
            facebook: req.body.facebook,
            notes: req.body.notes,
            category: req.body.category,
            introducer: req.body.introducer,
            memberOfAssociation: req.body.memberOfAssociation,
            memberOfCompany: req.body.memberOfCompany,
            membershipCeased: req.body.membershipCeased,
            statusWhenLastSubPaid: req.body.statusWhenLastSubPaid,
            organisation: req.body.organisation,
            positionOrDepartment: req.body.positionOrDepartment,
            occupation: req.body.occupation,
            legalQualificationOrVocation: req.body.legalQualificationOrVocation,
            jurisdictions: req.body.jurisdictions,
            relevantAreasOfLaw: req.body.relevantAreasOfLaw,
            legalResearchInterests: req.body.legalResearchInterests,
            nonLegalTasks: req.body.nonLegalTasks,
            otherProfessionalSpecialisms: req.body.otherProfessionalSpecialisms,
            volunteeringIntent: req.body.volunteeringIntent,
            volunteeringCompleted: req.body.volunteeringCompleted,
            telephone: req.body.telephone,
            address: req.body.address,
            city: req.body.city,
            county: req.body.county,
            state: req.body.state,
            province: req.body.province,
            postcodeORzipCode: req.body.postcodeORzipCode,
            country: req.body.country
        }, function (err, entity) {
            if (err) throw err;

            res.json(entity);
        });
});

router.delete('/:id', function (req, res) {
    var collection = db.get('usercollection');
    collection.remove({_id: req.params.id}, function (err, entity) {
        if (err) throw err;

        res.json(entity);
    });
});

module.exports = router;
