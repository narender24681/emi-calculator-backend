const express = require("express");
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const { UserModel } = require("../models/User.model");
const jwt = require('jsonwebtoken');
const { auth } = require("../middlewares/Auth.middleware");

userRouter.post("/signup", async (req, res) => {
    const {name, email, password} = req.body;
    // console.log(name, email, password);
    
    try {
        const user = await UserModel.findOne({email});
        // console.log(user);
    
        if (user) {
            res.status(200).send({"msg": "Email already present"});
        }
        else {
            bcrypt.hash(password, 5, async (err, hashPassword) =>  {
                const user = new UserModel({name, email, password: hashPassword});
                await user.save();
    
                res.status(200).send({"msg": "User created successfully"});
            });
        }
    }
    catch(err) {
        res.status(401).send({"err": err.message});
    }

})


userRouter.post("/login", async (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);

    try {
        const user = await UserModel.findOne({email});
        // console.log(user);
    
        if (user) {
            bcrypt.compare(password, user.password, async (err, result) => {
                if (result) {
                    var token = jwt.sign({ userId: user._id, userName: user.name }, "someRandomKey");

                    res.status(200).send({"msg": "Logged-in successfully", token})
                }
                else {
                    res.status(200).send({"msg": "Invalid credentials"})
                }
            });
        }
        else {
            res.status(200).send({"msg": "Email not found"})
        }
    }
    catch(err) {
        res.status(401). send({"err": err.message});
    }

})


userRouter.get("/profile", auth, async (req, res) => {
    const {userId, loggedInTimeStamp} = req.body;
    // console.log(userId, loggedInTimeStamp);

    try {
        const user = await UserModel.findOne({_id: userId});
        const {name, email} = user;
        // console.log(name, email);

        res.status(200).send({name, email, loggedInTimeStamp});
    }
    catch(err) {
        res.status(401). send({"err": err.message});
    }
})


userRouter.post("/emi-calculator", async (req, res) => {
    const {loanAmount, annualInterestRate, tenureInMonths} = req.body;
    console.log(loanAmount, annualInterestRate, tenureInMonths);

    try {
        // let e = p * r * (1+r)n / ((1+r)n-1);

        res.status(200). send({"msg": "emi"});
    }
    catch(err) {
        res.status(401). send({"err": err.message});
    }
})


userRouter.get("/logout", async (req, res) => {
    try {
        res.send({"token": ""})
    }
    catch(err) {
        res.status(401).send({"err": err.message});
    }
})

module.exports = {
    userRouter
}