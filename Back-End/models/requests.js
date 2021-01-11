const mongoose = require('mongoose')
const validator = require('validator')

const reqSchema = mongoose.Schema( {
    Req_Type:{
        type:String,
        required:true,
        validate(value){
            if(["admin","manager"].indexOf(value.toLowerCase()) === -1 )
                throw new Error('Request is Invalid')
        }
    },
    Owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
})

const req = mongoose.model('Requests',reqSchema)
module.exports = req

