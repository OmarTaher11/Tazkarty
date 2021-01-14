const router = require('express').Router();
const User = require('../models/user')
const Stadium = require('../models/stadium');

router.post("/stadium/create", async (req, res) => {
    try {
        user = await User.findById(req.body._id)
        if(user.Role !== 'manager')
        res.send({
            message:"Can't Create  a stadium"
        })

    
        var stadium_1 = new Stadium ({
                    Stadium_name: req.body.name,
                    Length:req.body.rows,
                    Width:req.body.cols
        })
        await stadium_1.save()
        return res.status(200).send(stadium_1)
    }
    catch(e){
        res.status(400).send(e)
    }

})


module.exports = router