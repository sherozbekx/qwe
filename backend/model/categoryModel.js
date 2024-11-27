const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String, required: true },
    address: { type: String, required: true },
    rating: { type: Number, enum: [1,2,3,4,5], required: true },
    status: { type: String, enum: ["active", "archive"], default: "active" }
}, {
    timestamps: true,
})
module.exports = mongoose.model("category", CategorySchema)