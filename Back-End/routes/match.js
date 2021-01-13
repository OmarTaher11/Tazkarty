const router = require('express').Router();
const Joi = require('@hapi/joi');
const Match = require('../models/match');
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth');
const { ObjectID } = require('mongodb');

router.get("/match/getByID", async (req, res) => {
    console.log(req.query)
    const match = await Match.findById({ _id: ObjectID(req.query._id) })
    console.log("========================Match=============================")
    console.log(match)
    await match.populate('stadium').execPopulate()
    return res.status(200).send(match)

})
router.get("/match/getAll", async (req, res) => {
    try {
        console.log(req.query)
        matches = await Match.find()
        console.log("========================Match=============================")
        console.log(matches)
        matches = await Promise.all(matches.map(async (match) => {
            await match.populate('stadium').execPopulate()
            return match
        }))
        return res.status(200).send(matches)
    }
    catch(e){
        res.status(400).send(e)
    }

})

function zeros(dimensions) {
    var array = [];

    for (var i = 0; i < dimensions[0]; ++i) {
        array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
    }

    return array;
}
module.exports = router