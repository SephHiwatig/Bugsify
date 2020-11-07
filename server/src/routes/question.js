/**
  Endpoints related to questions(Kata)
*/
const router = require("express").Router();
const { authenticateToken } = require('../utils/jwt'); 
const kataHandler = require('../lib/kata');
const solutionHandler = require('../lib/solution')

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

    if(!req.body.solution) {
        return res.status(400).json({ message: "Please provide a valid solution."})
    }

    const result = await kataHandler.initTest(req.body._id, req.body.solution);

    if(result.succeeded) {
        res.status(200).json(result.result);
    } else {
        res.status(500).send("Error");
    }
});

router.put("/api/kata/answer", authenticateToken, async (req, res) => {

    if(!req.body.solution) {
        return res.status(400).json({ message: "Please provide a valid solution."})
    }

    const result = await kataHandler.initTest(req.body._id, req.body.solution, req.user._id);

    if(result.succeeded) {
        res.status(200).json(result.result);
    } else {
        res.status(500).send("Error");
    }

});

router.get("/api/kata/solutions", authenticateToken, async (req, res) => {

    if(!req.query._id || !req.query.userId) {
        return res.status(400).json({ message: "Please provide kata and user id"})
    }

    const result = await solutionHandler.getSolutions(req.query._id, req.query.userId);

    if(result.succeeded) {
        return res.status(200).json(result.solutions);
    } else {
        return res.status(500).json(result.solutions)
    }

});

router.put("/api/kata/solutions/like", authenticateToken, async (req, res) => {

    if(!req.body._id || !req.body.userId) {
        return res.status(400).json({ message: "Please provide solution and user id"})
    }

    const result = await solutionHandler.likeSolution(req.body._id, req.body.userId);

    if (result.succeeded) {
        res.status(200).send("OK");
    } else {
        res.status(500).send("Error");
    }
});

router.post("/api/kata/solutions/comments/add", authenticateToken, async (req, res) => {

});

// router.get("/api/kata/solutions/comments", authenticateToken, async (req, res) => {

//     if(!req.query._id) {
//         return res.status(400).json({ message: "No solution id provided"})
//     }

//     res.send("OK");
// });



module.exports = router;