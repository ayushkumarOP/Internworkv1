const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema (
    {
        categoryName: { type: String, required: true },
        categoryTax: {type:Number, required:true},
        categoryImage: { type: String, required: true },
        subcategories: [{ type: String, required: true }]
    },
    { timestamps: true }
);
module.exports = mongoose.model("Category", categorySchema);

  