const mongoose = require('mongoose')
const Match = require('../models/match')


const ticketSchema = mongoose.Schema( {
    name:{
        type:String
    },
    seat:{
        type:Array,
        required:true
    }
    ,
    match:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Match',
    }
})

ticketSchema.virtual('Owner',{
    ref:'User',
    localField:'_id',
    foreignField: 'Tickets.Ticket'
})


ticketSchema.pre('remove', async function (next) {
    const ticket = this
    //await ticket.populate('match').execPopulate()
    match = await Match.findById(ticket.match)
    console.log(match)
    await match.populate('stadium').execPopulate()

    Width = match.stadium.Width
    const index = parseInt(ticket.seat[1]) +(parseInt(ticket.seat[0])*parseInt(Width))
    await match.Seats.set(index,0)
    await match.save()
    
    next()
})
const Ticket = mongoose.model('Tickets',ticketSchema)
module.exports = Ticket

