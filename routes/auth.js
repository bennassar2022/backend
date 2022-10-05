const router = require('express').Router();
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.post("/signup", async (req, res) => {
    //validate data  
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    //checking if  the  user is already in  the database
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send("email already exist")

    //hash the  password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
                       firstName: req.body.firstName,
                        lastName:req.body.lastName ,
                        number: req.body.number,
                        email: req.body.email,
                        password: hashedPassword
    })
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (err) {
        res.status(400).send(err)
    }

})
router.post("/login", async (req, res) => {
    //validate data  
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    //checking if  the  email exist
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("email does not exist")
    //checking  password  is  correct 
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send("invalide  password")
    //create and assign a token 
    const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
    //res.header("auth-token",token).send(token)
    return res.json({
        message: "logged it",
        _id:user._id,
        email: user.email,
        token: token,
    })

    
})

module.exports = router;