const router = require("express").Router();
const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");

//CREATE PRODUCT
router.post("/product/create", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
})

//UPDATE PRODUCT
router.put("/product/update", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
})

//DELETE PRODUCT
router.delete("/product/delete", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.body._id);
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET PRODUCT
router.get("/product/get", async (req, res) => {
    const { _id } = req.query;
    try {
        const findProduct = await Product.findById(_id);
        res.status(200).json(findProduct);
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET ALL PRODUCTS
router.get("/products/all", async (req, res) => {
    const { qNew, qCategory } = req.query;
    try {
        let products;
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5);  //get only last 5 products
        } else if (qCategory) {
            products = await Product.find({   //get products in that category
                categories: {
                    $in: JSON.parse(qCategory)    //array of the categories (if I want only one element just delete JSON.parse())
                }
            })
        } else {
            products = await Product.find();   //all products
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;