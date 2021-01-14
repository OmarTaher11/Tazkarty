const router = require('express').Router();
const User = require('../models/user')
const Request = require('../models/requests');
const { ObjectID } = require('mongodb');

router.post("/RequsetUpgrade", async (req, res) => {
    try {
        user = await User.findById(req.body._id)
        if(user.Role !== 'fan')
        return res.send({
            message:"cannot request upgrade"
        })
        old = await Request.findOne({Owner: ObjectID(req.body._id)})
        console.log(old)
        if(old){
            return res.send({
                message:"you already have put a request"
            })
        }
        R = new Request({
        Req_Type:req.body.Req_Type,
        Owner:ObjectID(req.body._id)
        })
        await R.save()
        return res.status(200).send(R)
    }
    catch(e){
        res.status(400).send(e)
    }

})

router.get("/GetRequestStatus", async (req, res) => {
    try {
        user = await User.findById(req.query.id)
        
        old = await Request.findOne({Owner: ObjectID(req.query.id)})
        if(old){
            return res.send({
                status:1
            })
        }
        res.send({
            status:0
        })
    }
    catch(e){
        res.status(400).send(e)
    }

})

router.get("/GetAllRequests", async (req, res) => {
    try {
        user = await User.findById(req.query.id)
        if(user.Role !== "admin")
        return res.send({
            message:"Cannot get requests"
        })
        requests = await Request.find()
        res.send({
            requests
        })
    }
    catch(e){
        res.status(400).send(e)
    }

})

router.post("/HandleRequest",async(req,res)=>{
    try{
        
        user = await User.findById(req.body._id)
        Req = await Request.findById(req.body.Req_id)
        //console.log(requests)
        type = req.body.type
        console.log(type)
        if(type === "approve"){
            Req_Owner = await User.findById(Req.Owner)
            Req_Owner.Role = Req.Req_Type
            console.log(Req_Owner.Role)
            await Req_Owner.save()
            await Req.remove()
        }else{
            await Req.remove()
        }
        return res.send({
            message:"ok"
        })
    }catch(e){
        res.status(400).send(e)
    }
})



module.exports = router