/**
  Endpoints related to admin actions
*/

const router = require("express").Router();
const { authenticateToken } = require('../utils/jwt'); 
const kataHandler = require('../lib/kata');

router.post("/api/admin/test", authenticateToken, async (req, res) => {

    // Verify that user is admin
    if(req.user.role !== 'admin')
        return res.status(401).send('Unauthorized');

    // Add the new kata
    const result = await kataHandler.addNewKata(req.body);

    if(result.succeeded) {
        return res.status(201).json({message: "Ok"});
    } else {
        return res.status(500).json({message: "Error"});
    }
    
});

module.exports = router;