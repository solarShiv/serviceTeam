require("dotenv").config();
const mongoose = require("mongoose");
const db_pass = process.env.DB_PASS;
// console.log(db_pass);
const DB = `mongodb+srv://solarshiv9:${db_pass}@cluster0.9jxao.mongodb.net/SERVICE?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(DB, {
    useNewUrlParser: true,
}).then(() => console.log("connection to MongoDB")).catch((error) => console.log(error.message));