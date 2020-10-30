/**
  Endpoints related to questions(Kata)
*/
const router = require("express").Router();
const { authenticateToken } = require('../utils/jwt'); 
const kataHandler = require('../lib/kata');

router.get("/api/kata/sample", async (req, res) => {

    const result = await kataHandler.getSampleKata();

    if(result.succeeded) {
        res.status(200).json(result.kata);
    } else {
        res.status(500).send("Error");
    }

});

router.get("/api/kata/question", authenticateToken,async (req, res) => {

    const result = await kataHandler.getKataToAnswer(req.body._id);

    if(result.succeeded) {
        res.status(200).json(result.kata);
    } else {
        res.status(500).send("Error");
    }

});



module.exports = router;