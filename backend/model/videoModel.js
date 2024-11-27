const mongoose = require("mongoose");
const VideoSchema = mongoose.Schema({
    categoryId: { type: mongoose.Schema.ObjectId, ref: "category", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["active", "archive"], default: "active" }
}, {
    timestapms: true
})

module.exports = mongoose.model("video", VideoSchema)