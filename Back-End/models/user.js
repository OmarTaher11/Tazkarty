const mongoose = require('mongoose')
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
        await user.save()
        return token
   
}



userSchema.methods.toJSON = function () {
    const user = this.toObject()
    delete user.password
    delete user.tokens
    return user
}
userSchema.statics.findByCredentials = async (email, password) => {
    
    const user = await User.findOne({
        email,
    })

    if(!user){
        throw new Error("unable to login")
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error("unable to login")
    }
    return user
}


userSchema.pre('save', async function (next) {
    const user = this
    if(this.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)

    }
    next()
})
const User = mongoose.model('User',userSchema)
module.exports = User

