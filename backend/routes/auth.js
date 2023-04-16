const router = require("express").Router();
const User = require("../models/User");

//REGISTER
router.post("/register", async (req, res) => {
    try {
        const user = new User({
            ...req.body
        })
        const newUser = await user.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;