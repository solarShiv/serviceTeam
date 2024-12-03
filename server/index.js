require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/auth.router');
const adminRouter = require('./routers/admin.router');
const warehouseRouter = require('./routers/warehouse.router');
const serviceRouter = require('./routers/service.router');
const commonRouter = require('./routers/common.router');
const farmerRouter = require('./routers/farmer.router');
require("./configs/db/mongoConn")
const app = express();
app.use(cookieParser());
app.use(cors({
  // origin: 'http://localhost:3000', // Replace with your React Native app's URL
  origin: true,
  credentials: true // Allow cookies  
}));
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/service", serviceRouter);
app.use("/warehouse", warehouseRouter);
app.use("/common", commonRouter);
app.use("/farmer", farmerRouter);

app.get('/', (req, res) => {
    res.send('Hello, Express!');
  });
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server is running ${port}.`);
})
