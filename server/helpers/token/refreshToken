const jwt = require('jsonwebtoken');
require("dotenv").config();
const refreshToken = async(empData) => {
        const token = jwt.sign(empData, process.env.JWT_SECRET, {expiresIn:"36h"});
        return "Bearer " + token;
}
module.exports = refreshToken;