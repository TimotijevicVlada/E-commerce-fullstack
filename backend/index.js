const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require("path");

//routes
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");

dotenv.config();
app.use(express.json());
app.use(cors());

//mongoose
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err))

//Routes to use
app.use("/", authRoute);
app.use("/", userRoute);
app.use("/", productRoute);

//Port to use
app.listen(process.env.PORT || 5000, () => {
    console.log(`Backend is running on port ${process.env.PORT || 5000}`)
})