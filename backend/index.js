const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require("path");

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

app.listen(process.env.PORT || 5000, () => {
    console.log(`Backend is running on port ${process.env.PORT || 5000}`)
})