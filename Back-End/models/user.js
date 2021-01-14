const mongoose = require('mongoose')
const Ticket = require('../models/ticket')
const stadium = require('../models/stadium')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema( {
    Username: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
        minlength: 7,
    },
    First_name: {
        type: String,
        required: true,
    },
    Last_name: {
        type: String,
        required: true,
    },
    Birth_date: {
        type: Date,
        required: true,
    },
    City: {
        type: String,
        required: true,
    },
    Gender: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
    },
    Email:{
        type:String,
        required: true,
        unique:true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('Email is Invalid')
        }
    },
    Role: {
        type: String,
        required: true,
        validate(value){
            if(["fan","admin","manager"].indexOf(value.toLowerCase()) === -1 )
                throw new Error('Role is Invalid')
        }
    },
    Tickets:[{
      Ticket:  {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Tickets'
        }
    }
    ],
    tokens:[
            {
            token:{
                    type: String,
                    required: true
                    }
                }
            ]
        })




userSchema.methods.genAuthToken = async function(){
        const user = this 
        const token = jwt.sign({_id: user._id}, "Tazkarty")
        user.tokens = user.tokens.concat({ token })
        console.log(user)
        await user.save()
        return token
   
}



userSchema.methods.toJSON = function () {
    const user = this.toObject()
    delete user.Password
    delete user.tokens
    return user
}
userSchema.statics.findByCredentials = async (email, password) => {
    console.log(email)
    const user = await User.findOne({Email : email})
    console.log('user')
    console.log(user)
    if(!user){
        console.log('mafesh email')
        throw new Error("unable to login")
    }

    //const isMatch = await bcrypt.compare(password,user.Password)
    const isMatch = (password===user.Password)
    if(!isMatch){
        console.log('el hash mesh zabet')
        throw new Error("unable to login")
    }
    return user
}


userSchema.pre('save', async function (next) {
    const user = this
    if(this.isModified('Password')){
       // user.Password = await bcrypt.hash(user.Password,8)

    }
    next()
})


userSchema.pre('remove', async function (next) {
    const user = this
    ids =await Promise.all( user.Tickets.map( async (ticket) => {
        //console.log(ticket)
        return  ticket.Ticket._id.toString()
    }))
    
    for (var i = 0; i < ids.length; i++) {
        T = await Ticket.findById(ids[i])
        await T.remove()
    }
    next()

})
const User = mongoose.model('User',userSchema)
module.exports = User

