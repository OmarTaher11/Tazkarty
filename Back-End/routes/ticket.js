const router = require('express').Router();
const Joi = require('@hapi/joi');
const User = require('../models/user')
const Ticket = require('../models/ticket');
const Match = require('../models/match');
const auth = require('../middleware/auth');
const { ObjectID } = require('mongodb');
const { now } = require('mongoose');

router.post('/ticket/book',async (req, res) =>{
    try{
        console.log(req.body)
        user = await User.findOne({ _id: req.body._id})
        match = await Match.findById(req.body.Match_id)
        await match.populate('stadium').execPopulate()
        Width = match.stadium.Width
        Length = match.stadium.Length
        const index = parseInt(req.body.idx) +(parseInt(req.body.row)*parseInt(Width))
        if(match.Seats[index]===1)
        {
         return   res.status(200).send({message : 'the seat is full'})
        }
        if((parseInt(req.body.idx) > Width )||  (parseInt(req.body.row) > Length))
        return res.send({
            message:"There's no seat with that number"
        })
        //here we reserve the ticket
        ticket = new Ticket({
            name: match.Home_Team +" Vs "+match.Away_Team,
            seat: [req.body.row,req.body.idx],
            match: ObjectID(match._id)
        })
        await match.Seats.set(index,1)
        await match.save()
        //match = await Match.findById(req.body.Match_id)
        //console.log(match.Seats[0][0])
        user.Tickets=await user.Tickets.concat({Ticket: ObjectID(ticket._id)})
        await user.save()
        await ticket.save()
        res.status(200).send(ticket)
    }
    catch(e)
    {
        res.status(400).send({Error:e.message})        
    }


})

router.post('/ticket/cancel',async (req, res) =>{
    try{
        user = await User.findOne({ _id: req.body._id})
        T1 = await Ticket.findById(req.body.Ticket_id)
        await T1.populate('match').execPopulate()
        match = T1.match
        //await user.populate('Tickets.Ticket').execPopulate()
        ids =await Promise.all( user.Tickets.map( async (ticket) => {
            //console.log(ticket)
            return  ticket.Ticket._id.toString()
        }))
        //console.log(ids.indexOf())
        if(ids.indexOf(T1._id.toString())==-1)
        return res.send({
            message:"no such Ticket"
        })
        time = T1.match.Date
        nowTime = new Date()
        var Difference_In_Time = time.getTime() - nowTime.getTime(); 
  
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
        if(Difference_In_Days < 3)
        return res.send({
            message:"Cannot cancel ticket, the match is beginning withn 3 days" 
        })

        await user.Tickets.splice(ids.indexOf(T1._id.toString()), 1);
        await user.save()
        await T1.remove()
    
        res.status(200).send(T1)
    }
    catch(e)
    {
        res.status(400).send({Error:e.message})        
    }


})
module.exports = router