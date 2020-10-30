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

    const result = await kataHandler.getKataToAnswer(req.query._id);

    if(result.succeeded) {
        res.status(200).json(result.kata);
    } else {
        res.status(500).send("Error");
    }

});

router.put("/api/kata/answer/sample", async (req, res) => {
    console.log(req.body.solution);

    res.status(200);
});



module.exports = router;