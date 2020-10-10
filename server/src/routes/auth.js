/**
  Endpoints related to user authentication/creation
*/

const router = require("express").Router();
const jwt = require('jsonwebtoken');
const { createNewUser } = require('../lib/user');
const { isPasswordValid, isEmailValid, isUserInfoValid } = require('../utils/inputValidators');


// Endpoints
router.get("/api/login", (req, res) => {
    res.send("User logged in.")
});

router.post("/api/register", async (req, res) => {
    console.log(req.body)
    // Validate all required fields are not null/undefined
    if(!isUserInfoValid(req.body))
        return res.status(400).json({ message: "Please provide all necessary information."});

    // Validate password input
    if(!isPasswordValid(req.body.password))
        return res.status(400).json({ message: "Please provide a valid password." });

    // Validate email
    if(!isEmailValid(req.body.email))
        return res.status(400).json({ message: "Please provide a valid email address."});

    // Create new user
    const newUser = await createNewUser(req.body);
    if(newUser.succeeded) {
        res.status(201).send();
    } else {
        res.status(400).json({ message: newUser.message});
    }
});

module.exports = router;