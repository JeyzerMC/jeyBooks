var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: String,
    availability: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Books", bookSchema);