const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");

//GET USER
router.get("/user/get", verifyToken, async (req, res) => { //middleware function to check the token
    try {
        const { id } = req.query;
        const user = await User.findById(id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET ALL USERS
router.get("/users/all", verifyTokenAndAdmin, async (req, res) => {  //only admin can get all users
    try {
        const query = req.query.new;
        const allUsers = query
            ? await User.find().sort({ _id: -1 }).limit(1)  //return the latest user
            : await User.find();  //return all users
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json(200);
    }
})

//UPDATE USER
router.put("/user/update", verifyToken, async (req, res) => {
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

//DELETE USER
router.delete("/user/delete", verifyToken, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.body.id);
        const { password, ...others } = deletedUser._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
})

//USER STATS
router.get("/user/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))  //last year in this time
    try {
        const stats = await User.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: lastYear   //greater than
                    }
                }
            },
            {
                $project: {
                    month: {
                        $month: "$createdAt"
                    }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: {
                        $sum: 1
                    }
                }
            }
        ])
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;