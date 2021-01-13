const router = require('express').Router();
const Joi = require('@hapi/joi');
const Ticket = require('../models/ticket');
const Match = require('../models/match');
const auth = require('../middleware/auth');
const { ObjectID } = require('mongodb');

router.post('/ticket/reserve',async (req, res) =>{
    try{
        console.log(req.body)
        user = await User.findOne({ _id: req.body._id})
        match = Match.findById({_id: req.body.Match_id})
        if(match.Seats[req.body.row][req.body.idx]==1)
        {
            res.status(200).send({message : 'the seat is full'})
        }
        //here we reserve the ticket
        ticket = new Ticket({
            name: req.body.user.Username,
            seat: [req.body.row,req.body.idx],
            match: match._id
        })
        match.Seats[req.body.row][req.body.idx] = 1
        await match.save()
        user.Tickets=await user.Tickets.concat({Ticket: ObjectID(ticket._id)})
        await user.save()
        await ticket.save()
        res.status(200).send()
    }
    catch(e)
    {
        res.status(400).send({Error:e.message})        
    }


})
module.exports = router