import mongoose from "mongoose";

const ProductTransactionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    dateOfSale: { type: Date, required: true },
    category: { type: String, required: true },
    sold: { type: Boolean, required: true }
});

const ProductModel = mongoose.models.product||mongoose.model("product",ProductTransactionSchema);

export default ProductModel;
