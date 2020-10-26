/**
  Endpoints related to admin actions
*/

const router = require("express").Router();
const { authenticateToken } = require('../utils/jwt'); 
const kataHandler = require('../lib/kata');

router.post("/api/admin/add-kata", authenticateToken, async (req, res) => {

    // Verify that user is admin
    if(req.user.role !== 'admin')
        return res.status(401).send('Unauthorized');

    // Parse the tests output to its proper type
    const kata = kataHandler.parseKataTestOutput(req.body);

    // Add the new kata
    const result = await kataHandler.addNewKata(kata);

    if(result.succeeded) {
        return res.status(201).json({message: "Ok"});
    } else {
        return res.status(500).json({message: "Error"});
    }

});

router.get("/api/admin/katas", authenticateToken, async (req, res) => {

    // Verify that user is admin
    if(req.user.role !== 'admin')
        return res.status(401).send('Unauthorized');

    // build paging object
    const pagingInfo = {
        pageSize: req.query.pageSize ? parseInt(req.query.pageSize) : 10,
        pageNumber: req.query.pageNumber ? parseInt(req.query.pageNumber) : 1,
        filterState: req.query.filterState
    };

    const result = await kataHandler.getPagedKatas(pagingInfo);

    if(result.succeeded) {
        res.status(200).json({ katas: result.katas, pagingInfo: result.pagingInfo });
    } else {
        res.status(500).json({message: "Error"});
    }
})

router.get("/api/admin/search", authenticateToken, async (req, res) => {

    // Verify that user is admin
    if(req.user.role !== 'admin')
        return res.status(401).send('Unauthorized');

    var result = await kataHandler.searchKatas(req.query.key, req.query.pageSize);

    if(result.succeeded) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result);
    }
});

router.get("/api/admin/test", async (req, res) => {

    const result = await kataHandler.test();

    res.status(200).json(result[3]);

});

module.exports = router;