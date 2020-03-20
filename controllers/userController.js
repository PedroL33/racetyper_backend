const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user')

exports.createUser = [
    check("password").isLength({min: 6}).withMessage("Must be 6 characters."),
    check("username").isLength({min: 6}).withMessage("Must be 6 characters."),
    check("email").isEmail().withMessage("Invalid Email address."),
    (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            res.status(500).json({errors})
        }else {
            bcrypt.hash(req.body.password, 12, (err, hash) => {
                var user = new User({
                    password: hash,
                    username: req.body.username,
                    email: req.body.email
                })
                user.save((err) => {
                    if(err) {
                        if (err.name === 'MongoError' && err.code === 11000) {
                            res.status(400).json({
                                errors: "Username already taken."
                            })
                        }else {
                            res.status(500).json({
                                errors: "Could not create user."
                            })
                        }
                    }else {
                        res.status(200).json({
                            msg: "Signup successful",
                        })
                    }
                })
            })
        }
    }
]

exports.loginUser = (req, res) => {
    User.find({username: req.body.username})
    .exec()
    .then((user) =>{
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(!result) {
                res.status(400).json({
                    error: "Invalid Credentials"
                })
            }else {
                var token = jwt.sign({ user: user[0]._id, username: user[0].username }, process.env.JWTSECRETKEY, {expiresIn: '1hr'})
                res.status(200).json({
                    msg: "Logged In",
                    token: token
                })
            }
        })
    })
    .catch(err => {
        if(err) {
            res.status(404).json({
                error: "Invalid Credentials"
            })
        }
    })
}
