const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");

//REGISTER
router.post("/register", async (req, res) => {
    try {
        const user = new User({
            ...req.body,
            password: CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString()
        })
        const newUser = await user.save();
        const { password, ...others } = newUser._doc;
        res.status(200).json(others);
    } catch (error) {
        let errorMessage = "";
        if (error.keyValue.email) {
            errorMessage = "This email already exist"
        } else if (error.keyValue.username) {
            errorMessage = "This username already exist"
        } else {
            errorMessage = error
        }
        res.status(500).json(errorMessage);
    }
})

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.status(401).json("Wrong username");
            return;
        }
        const hashedPassword = CryptoJs.AES.decrypt(user.password, process.env.PASS_SECRET).toString(CryptoJs.enc.Utf8);
        if (hashedPassword !== req.body.password) {
            res.status(401).json("Wrong password");
            return;
        }
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;