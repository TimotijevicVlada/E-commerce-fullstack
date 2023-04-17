const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const { verifyToken } = require("./verifyToken");

//UPDATE USER
router.put("/user/update", verifyToken, async (req, res) => {  //middleware function to check the token
    try {
        const encryptPass = CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString();
        const newUser = {
            ...req.body,
            password: encryptPass
        }
        const updatedUser = await User.findByIdAndUpdate(req.body._id, { $set: newUser }, { new: true })
        const { password, ...others } = updatedUser._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;