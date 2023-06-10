const express = require("express");
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const token = req.headers.authorization;
    // console.log(token);

    if (token) {
        try {
            var decoded = jwt.verify(token.split(" ")[1], 'someRandomKey');
            // console.log(decoded);
            console.log(new Date);

            if (decoded.userId) {
                req.body.userId = decoded.userId;
                req.body.userName = decoded.userName;
                req.body.loggedInTimeStamp = new Date;

                next();
            }
            else {
                res.status(200).send({"msg": "Login to see user profile"})
            }
        }
        catch(err) {
            res.status(401).send({"err": err.message});
        }
    }
    else {
        res.status(200).send({"msg": "Login to see user profile"})
    }
    
}

module.exports = {
    auth
}