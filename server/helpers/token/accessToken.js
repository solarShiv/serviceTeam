const jwt = require('jsonwebtoken');
require("dotenv").config();
const accessToken = async(empData) => {
    const token = jwt.sign(empData, process.env.JWT_SECRET, {expiresIn:"9h"});
    return "Bearer " +token;
}
module.exports = accessToken;