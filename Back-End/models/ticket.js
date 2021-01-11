const mongoose = require('mongoose')



const ticketSchema = mongoose.Schema( {
    name:{
        type:String
    },
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
const Ticket = mongoose.model('Tickets',ticketSchema)
module.exports = Ticket

