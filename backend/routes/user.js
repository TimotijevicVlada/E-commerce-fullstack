const router = require("express").Router();
const User = require("../models/User");

//GET USER
router.get("/user/get", async (req, res) => {
    try {
        res.status(200).json("GET USER IS SUCCESSFULLY");
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;