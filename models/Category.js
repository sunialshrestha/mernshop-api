const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema(
    {
        name: {type:String, required: true},
        parent_id: { type: mongoose.Schema.Types.ObjectId, default: null},
        slug: { type: String, required: true, unique: true}
    }
);

module.exports = mongoose.model("Category", CategorySchema)