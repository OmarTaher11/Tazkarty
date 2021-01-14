const router = require('express').Router();
const Joi = require('@hapi/joi');
const User = require('../models/user');
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')
const Requset = require('../models/requests')
//-------------------- Signup
router.post('/user/fan/signup', async (req, res) => {
    try {

        console.log(req.body)
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
                Gender: req.body.Gender,
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
        return res.status(400).send({ Error: e.message })
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
        res.status(400).send({ Error: e.message })
    }
})
//------------------------------Edit User Data
router.post('/user/fan/editinfo', async (req, res) => {
    try {
        err = await validateFanUser_editInfo(req.body)
        if (err) {
            console.log("err")
            console.log(err)
            throw Error(err)
        }
        user = await User.findOne({ _id: req.body._id})
        user.Password = req.body.newPassword == null ? user.Password : req.body.newPassword
        user.First_name = req.body.First_name == null ? user.First_name : req.body.First_name
        user.Last_name = req.body.Last_name == null ? user.Last_name : req.body.Last_name
        user.Birth_date = req.body.Birth_date == null ? user.Birth_date : req.body.Birth_date
        user.City = req.body.City == null ? user.City : req.body.City
        user.Address = req.body.Address == null ? user.Address : req.body.Address
        user.Gender = req.body.Gender == null ? user.Gender : req.body.Gender

        await user.save()
        res.send(user.toJSON())
    } catch (e) {
        res.status(400).send({ Error: e.message })
    }
})
//-----------------------------get user--------
router.get("/user/fan/me",auth, async (req, res) => {
    console.log("========================USER=============================")
    console.log(req.user)
    await req.user.populate('Tickets.Ticket').execPopulate()
    console.log("======================Tickets===========================")
    console.log(req.user.Tickets)
    console.log("==============IS THIS EVEN HIS FINAL FORM====================")
    Tickets = await Promise.all(req.user.Tickets.map(async (ticket) => {
        //console.log(ticket)
        await ticket.Ticket.populate('match').execPopulate()
        await ticket.Ticket.match.populate('stadium').execPopulate()
        //console.log(ticket)
        return ticket.Ticket
    }))
    console.log(Tickets)
    req.user = req.user.toJSON()
    req.user.Tickets = Tickets
    console.log(req.user.Tickets)
    return res.status(200).send(req.user)

})
//-----------------------------get user by id--------
router.get("/user/fan/getByID", async (req, res) => {
    try {
        user = await User.findById({ _id: req.query._id })
        if (!user) {
            res.status(400).send({ Error: "No such user" })
        }
        console.log("========================USER=============================")
        console.log(user)
        await user.populate('Tickets.Ticket').execPopulate()
        console.log("======================Tickets===========================")
        console.log(user.Tickets)
        console.log("==============IS THIS EVEN HIS FINAL FORM====================")
        Tickets = await Promise.all(user.Tickets.map(async (ticket) => {
            //console.log(ticket)
            await ticket.Ticket.populate('match').execPopulate()
            await ticket.Ticket.match.populate('stadium').execPopulate()
            //console.log(ticket)
            return ticket.Ticket
        }))
        console.log(Tickets)
        user = user.toJSON()
        user.Tickets = Tickets
        console.log(user.Tickets)
        return res.status(200).send(user)
    }
    catch (e) {
        res.status(400).send({ Error: e.message })
    }

})

////////////////////////////////////////////////

router.delete("/user/delete", async (req, res) => {
   try{ 
    user = await User.findById(req.body._id)
    deletedUser = await User.findById(req.body.userToDelete)
    //console.log(user)
    if(user.Role !== "admin")
    return res.send({
        message:"Cannot Delete User"
    })


    await deletedUser.remove()
    res.send({
        message:"ok"
    })
    }catch(e){
        res.status(400).send(e)
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
            Gender: Joi.string().required(),
            Address: Joi.string().allow(''),
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
            _id: Joi.string().required(),
            newPassword: Joi.string().min(7),
            First_name: Joi.string(),
            Last_name: Joi.string(),
            Birth_date: Joi.date().iso(),
            City: Joi.string(),
            Address: Joi.string()
        });
    return schema.validate(user).error;
}
module.exports = router