const router = require('express').Router();
const Joi = require('@hapi/joi');
const Match = require('../models/match');
const Stadium = require('../models/stadium')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth');
const { ObjectID, Int32 } = require('mongodb');
const User = require('../models/user');
const stadium = require('../models/stadium');
const { number } = require('@hapi/joi');

router.get("/match/getByID", async (req, res) => {
    console.log(req.query)
    const match = await Match.findOne({ _id: req.query._id })
    console.log("========================Match=============================")
    console.log(match)
    await match.populate('stadium').execPopulate()
    return res.status(200).send(match)

})

router.post("/match/edit", async (req, res) => {
    //console.log(req.query)
    const user = await User.findById(req.body._id)
    console.log(user)
    if(user.Role !== 'manager')
    return res.send({
        message:"Cannot edit match"
    })
    const match = await Match.findOne({ _id: req.body.Match_id })
    match.Home_Team = req.body.Home_Team == null ? match.Home_Team : req.body.Home_Team
    match.Away_Team = req.body.Away_Team == null ? match.Away_Team : req.body.Away_Team
    match.Date = req.body.Date == null ? match.Date : req.body.Date
    match.Main_Ref = req.body.Main_Ref == null ? match.Main_Ref : req.body.Main_Ref
    match.Line1_Ref = req.body.Line1_Ref == null ? match.Line1_Ref : req.body.Line1_Ref
    match.Line2_Ref = req.body.Line2_Ref == null ? match.Line2_Ref : req.body.Line2_Ref
    if(req.body.stadium_id != null){
        match.stadium = ObjectID(req.body.stadium_id)
        const stadium = await Stadium.findById(req.body.stadium_id)
        Rows = stadium.Length
        Cols = stadium.Width
        console.log()
        Seats  = zeros(Rows*Cols)
        match.Seats = Seats
    }
    await match.save()
    return res.status(200).send(match)

})


router.get("/match/getAll", async (req, res) => {
    try {
        if(!req.query.limit){
        matches = await Match.find()
        } 
        else{
        matches = await Match.find().limit(parseInt(req.query.limit))
        }//console.log(req.query)
        console.log("========================Match=============================")
        console.log(matches)
        matches = await Promise.all(matches.map(async (match) => {
            await match.populate('stadium').execPopulate()
            match = match.toJSON()
            delete match.Seats
            return match
        }))
        //console.log(matches[0].Home_Team)
        return res.status(200).send(matches)
    }
    catch(e){
        res.status(400).send(e)
    }

})

router.post("/match/create", async (req, res) => {
    try {
        user = await User.findById(req.body._id)
        console.log(user)
        if(user.Role !== 'manager')
        res.send({
            message:"Can't Create  a match"
        })
        const stadium = await Stadium.findById(req.body.stadium_id)
        
        Rows = stadium.Length
        Cols = stadium.Width
        Seats  = zeros(Rows*Cols)
        match = new Match({
                Home_Team: req.body.Home,
                Away_Team: req.body.Away,
                stadium: ObjectID(stadium._id),
                Date:req.body.Date,
                Main_Ref:req.body.Main_Ref,
                Line1_Ref:req.body.Line1_Ref,
                Line2_Ref:req.body.Line2_Ref,
                Seats,
            })
        await match.save()
        await match.populate('stadium').execPopulate()
        return res.status(200).send(match)
    }
    catch(e){
        res.status(400).send(e)
    }

})

function zeros(l) {
    var array = [];

    for (var i = 0; i < l; ++i) {
        array.push(0)//dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
    }

    return array;
}
module.exports = router