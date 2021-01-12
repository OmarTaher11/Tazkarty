const router = require('express').Router();
const Joi = require('@hapi/joi');
const User = require('../models/user');
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')

//-------------------- Signup
router.post('/user/fan/signup', async (req, res) => {
    try {

        err = validateFanUser_Signup(req.body)
        if (err) {
            console.log("err")
            console.log(err)
            throw Error(err)
        }
        const user1 = await User.findOne({
            email: req.body.Email
        })
        if (user1) {
            console.log(req.body.Email)
            throw new Error("Already Used Email")
        }
        console.log('first')

        const user2 = await User.findOne({
            Username: req.body.Username
        })
        if (user2) {
            console.log(req.body.Username)
            throw new Error("Already Used Username")
        }
        console.log('second')
        const user = new User(
            {
                Username: req.body.Username,
                Password: req.body.Password,
                First_name: req.body.First_name,
                Last_name: req.body.Last_name,
                Birth_date: req.body.Birth_date,
                City: req.body.City,
                Address: req.body.Address,
                Email: req.body.Email,
                Role: 'fan'
            })
        console.log('3amlt user')
        console.log(user)
        saved_user = await user.save();
        console.log('3amlt save')
        console.log(saved_user)
        res.status(200).send({
            _id: saved_user._id
        })
    }
    catch (e) {
        console.log('catch')
        console.log(e.message)
        return res.status(400).send(e.message)
    }
})
//------------------------------ Signin
router.post('/user/fan/signin', async (req, res) => {
    try {

        err = await validateFanUser_Signin(req.body)
        if (err) {
            console.log("err")
            console.log(err)
            throw Error(err)
        }
        console.log('wtf I did it')
        const user = await User.findByCredentials(req.body.Email, req.body.Password)

        const token = await user.genAuthToken()
        res.send({
            message: "login successfully",
            userId: user._id,
            token
        })
    } catch (e) {
        res.status(400).send(e.message)
    }
})
//------------------------------Edit User Data
router.post('/user/fan/editinfo', auth,async (req, res) =>{
    try {
        err = await validateFanUser_editInfo(req.body)
        if (err)
        {
            console.log("err")
            console.log(err)
            throw Error(err)
        }
        console.log('wtf I did it')
        const user = await User.findByCredentials(req.body.Email, req.body.Password)
        if( user.email !== req.user.email ){
            return res.status(400).send('not available operation')
        } 
        req.user.Password = req.body.newPassword==null?req.user.Password:req.body.newPassword
        req.user.First_name = req.body.First_name==null?req.user.First_name:req.body.First_name
        req.user.Last_name = req.body.Last_name==null?req.user.Last_name:req.body.Last_name
        req.user.Birth_date = req.body.Birth_date==null?req.user.Birth_date:req.body.Birth_date
        req.user.City = req.body.City==null?req.user.City:req.body.City
        req.user.Address = req.body.Address==null?req.user.Address:req.body.Address
        await req.user.save()
        res.send(req.user.toJSON())
    } catch (e) {
        res.status(400).send(e.message)
    }
})
//---------------------------------------------
// Validation/////////////////
validateFanUser_Signup = (user) => {
    const schema = Joi.object(
        {
            Username: Joi.string().required(),
            Password: Joi.string().required().min(7),
            First_name: Joi.string().required(),
            Last_name: Joi.string().required(),
            Birth_date: Joi.string().required(),
            City: Joi.string().required(),
            Address: Joi.string(),
            Email: Joi.string().required().email(),
        });
    return schema.validate(user).error;
}
validateFanUser_Signin = (user) => {
    const schema = Joi.object(
        {
            Password: Joi.string().required().min(7),
            Email: Joi.string().required().email()
        });
    return schema.validate(user).error;
}
validateFanUser_editInfo = (user) => {
    const schema = Joi.object(
        {
            _id: Joi.string(),
            Username: Joi.string(),
            Password: Joi.string().required().min(7),
            newPassword: Joi.string().min(7),
            First_name: Joi.string(),
            Last_name: Joi.string(),
            Birth_date: Joi.string(),
            City: Joi.string(),
            Address: Joi.string(),
            Email: Joi.string().email().required(),
        });
    return schema.validate(user).error;
}
module.exports = router