require('dotenv').config();
const mongoose = require('mongoose');


const MONGO_URL=process.env.MONGO_URL;


mongoose.connect(MONGO_URL)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));
