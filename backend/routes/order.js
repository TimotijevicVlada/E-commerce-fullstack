const router = require("express").Router();
const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");

//CREATE ORDER
router.post("/order/create", verifyToken, async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const saveOrder = await newOrder.save();
        res.status(200).json(saveOrder);
    } catch (error) {
        res.status(500).json(error);
    }
})

//UPDATE ORDER
router.put("/order/update", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
})

//DELETE ORDER
router.delete("/order/delete", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.body._id);
        res.status(200).json(deletedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET USER ORDERS
router.get("/order/get", verifyToken, async (req, res) => {
    const { _id } = req.query;
    try {
        const userOrders = await Order.find({ userId: _id });
        res.status(200).json(userOrders);
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET ALL ORDERS
router.get("/orders/all", verifyTokenAndAdmin, async (req, res) => {
    try {
        const allOrders = await Order.find();
        res.status(200).json(allOrders);
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth }     //greater than prev month
                }
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ])
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;