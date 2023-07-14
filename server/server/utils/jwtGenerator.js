const jwt = require("jsonwebtoken");
require('dotenv').config();
function jwtGenerator( user) {
   const payload = {
      user_id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
   };
   return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "50hr" });
}
function getItem(token) {
   const decoded = jwt.verify(token,process.env.jwtSecret);
   return decoded;
}
module.exports = {jwtGenerator,getItem};