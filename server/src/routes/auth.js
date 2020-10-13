/**
  Endpoints related to user authentication/creation
*/

const router = require("express").Router();
const { createNewUser, getUserByUsername } = require('../lib/user');
const { matchPassword, createTokenForUser } = require('../utils/jwt'); 
const { isPasswordValid, isEmailValid, isUserInfoValid } = require('../utils/inputValidators');


// Endpoints
router.post("/api/login", async (req, res) => {

    // Check that userinfo(username, password) is valid
    if(!isUserInfoValid(req.body))
        return res.status(400).json({ message: "Invalid username or password."});
    
    // Get user from database
    const result = await getUserByUsername(req.body.username);

    // check for errors
    if(result.error) {
        return res.status(result.status).send({ message: result.message });
    }

    // Verify that password matches
    if(await matchPassword(req.body.password, result.user.password)) {
        const accessToken = createTokenForUser(result.user);
        return res.status(200).json({ message: "success", accessToken });
    }

    return res.status(401).json({ message: "Invalid username or password."});
});

router.post("/api/register", async (req, res) => {
   
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
        res.status(201).send(newUser);
    } else {
        res.status(400).json(newUser);
    }

});

module.exports = router;