const mongoose = require("mongoose");

const subvariantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: false } // Adjust if price is optional for subvariants
});

const variantSchema = new mongoose.Schema({
    type: { type: String, required: true },
    subvariants: [subvariantSchema]
});

const combinationSchema = new mongoose.Schema({
    combination: { type: Map, of: String, required: true },
    price: { type: Number, required: true },
    _id: mongoose.Schema.Types.ObjectId
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    variantType: { type: String, required: true }, 

    categoryTax: {type:Number, required:true},

    price: { type: Number }, 
    variants: [String], 
    combinations: [combinationSchema], 
    subvariants: [[String]], 
    category: { type: String, required: true },
    subcategory: { type: String, required: true }
}, 
{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
