var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/StippedV');

router.get('/', function(req, res) {
    var collection = db.get('usercollection');
    collection.find({},{}, function(err, userList){
        if (err) throw err;
        res.json(userList);
    });
});

router.post('/', function(req, res){
    var collection = db.get('usercollection');
    collection.insert({
        title: req.body.username,
        description: req.body.useremail
    }, function(err, entity){
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
            title: req.body.username,
            description: req.body.useremail
        }, function (err, entity) {
            if (err) throw err;

            res.json(entity);
        });
});

module.exports = router;
