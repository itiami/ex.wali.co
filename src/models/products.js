// models/product.js
import mongoose from "mongoose";

function randomImage() {
    return "https://random.imagecdn.app/500/150";
}


const productSchema = new mongoose.Schema(
    {
        title: String,
        weight: String,
        quality: String,
        detail: String,
        price: Number,
        imageUrl: {
            type: String,
            default: randomImage()
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "categorySchema",
        }
    },
    { timestamps: true },
);
// set() is use for custom TableName
productSchema.set('collection', 'product');


/*
To create table/collection using 
mongoose.model(name, schema);
This name is use as a reference to make relation with other collection.
Example product table with category table
*/
const productTbl = mongoose.model("productSchema", productSchema)
export {
    productTbl as default
}