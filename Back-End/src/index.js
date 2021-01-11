const express = require('express')
require('../db/mongoose')
const User = require('../models/user')
const Match = require('../models/match')
const Ticket = require('../models/ticket')
const Stadium = require('../models/stadium')
const app = express()
app.use(express.json())
const { ObjectID } = require('mongodb')
const stadium = require('../models/stadium')
//router.use(bodyParser.urlencoded({ extended: false }));
//router.use(bodyParser.json());


app.get('/', async (req,res) => {
    var stadium_1 = new Stadium ({
        Stadium_name: "El Tetsh",
        Length:20,
        Width:40
    })


const match = new Match({
    Home_Team: "Al ahly",
    Away_Team: "Al zamalek",
    stadium: ObjectID(stadium_1._id),
    Date:new Date(),
    Main_Ref:"Samir Osman",
    Line1_Ref:"Gehad Gresha",
    Line2_Ref:"Mahmoud EL bann",
    Seats:[]
})

    T1 = new Ticket({
        name:"MATCH",
        match: ObjectID( match._id )
    })
    Tickets = [{Ticket:ObjectID(T1._id)}]
    var user1 = new User({
        Username:"OmarTaher",
        Password:"TaherTaher",
        First_name:"Omar" ,
        Last_name:"Taher",
        Birth_date: new Date(),
        City:"Cairo",
        Address:"2a",
        Email:"Omar@yahoo.com",
        Role:"fan",
        Tickets,
    })
    try{
        /*await stadium_1.save()
        await match.save()
        await T1.save()
        await user1.save()
        */
       //console.log("T2")
        //T2.populate('Owner').execPopulate()

        
    var anyUser = await User.findOne({})
    T = await Ticket.findOne({})
    S = await Stadium.findOne({})
    

    await anyUser.populate('Tickets.Ticket').execPopulate()
    Tickets =await Promise.all( anyUser.Tickets.map( async (ticket) => {
        //console.log(ticket)
        await ticket.Ticket.populate('match').execPopulate()
        await ticket.Ticket.match.populate('stadium').execPopulate()
        return  ticket.Ticket
    }))
    
    anyUser = anyUser.toJSON()
    anyUser.Tickets = Tickets
    
    await T.populate('Owner').execPopulate()
    await S.populate('Matches').execPopulate()
    res.send(S.Matches)
    }catch(e){
        console.log("error")
    res.send(e)
    }
})
app.listen(3000,()=>{
    console.log("server is up")
})