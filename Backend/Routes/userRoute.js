const express = require("express");
const { userModel } = require("../Models/userModel");

// for hashing & comparing a password
const bcrypt = require("bcrypt")


// for genrating a token
const jwt = require("jsonwebtoken");

// dot env accessing variables
require("dotenv").config();

// router
const userRouter = express.Router()


// register
userRouter.post("/register", async (req, res) => {
    // console.log(req.body);
    const { name, email, password, } = req.body;

    try {
        const user = await userModel.findOne({ email })
        if (user) {
            res.status(400).json({ msg: "User is already Registered....!" })
        }
        else {
            bcrypt.hash(password, 5, async (err, hash) => {
                const newUser = new userModel({ ...req.body, password: hash })
                await newUser.save()
                res.status(200).json({ msg: "User has been Registered" })
            })
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
})


// login
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email })
        console.log("user",user);
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userName: user.name, userID: user._id }, process.env.secret)

                    res.status(200).json({
                        msg: "Login Successfull....!", token: token, user: {
                            userName: user.name,
                            userEmail: user.email
                        },
                    })
                }
                else
                    res.status(400).json({ msg: "Wrong Credentials" });
            })
        }
        else {
            res.status(400).json({ msg: "User not Exist" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


module.exports = {
    userRouter
}