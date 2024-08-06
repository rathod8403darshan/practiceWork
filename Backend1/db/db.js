const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Rathod").
then(console.log("db is connect"))