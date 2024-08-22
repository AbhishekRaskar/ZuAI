const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: String },
    userID: { type: String},
    createdAt: { type: Date, default: Date.now }
}, {
    versionKey: false
});

const postModel = mongoose.model("post", postSchema);

module.exports = { 
    postModel
 };
