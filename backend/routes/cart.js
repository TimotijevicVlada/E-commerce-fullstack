const router = require("express").Router();
const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");

//GET CART
router.get("/cart/get", verifyToken, async (req, res) => {
    const { _id } = req.query;
    try {
        const cart = await Cart.findOne({ userId: _id });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET ALL CARTS
router.get("/carts/all", verifyTokenAndAdmin, async (req, res) => {
    try {
        const allCarts = await Cart.find();
        res.status(200).json(allCarts);
    } catch (error) {
        res.status(500).json(error);
    }
})

//CREATE CART
router.post("/cart/add", verifyToken, async (req, res) => {
    const newCartItem = new Cart(req.body);
    try {
        const savedToCart = await newCartItem.save();
        res.status(200).json(savedToCart);
    } catch (error) {
        res.status(500).json(error);
    }
})

//UPDATE CART
router.put("/cart/update", verifyToken, async (req, res) => {
    try {
        const updatedCart = await Cart.findOneAndUpdate({ userId: req.body.userId }, { $set: req.body }, { new: true })
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(error);
    }
})

//DELETE CART
router.delete("/cart/delete", verifyToken, async (req, res) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete(req.body._id);
        res.status(200).json(deletedCart);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;