import productTbl from "../models/products.js";
import categoryTbl from '../models/categories.js';
import mongoose from "mongoose";
import { connectDB, closeConnection } from "../_con/connection.js";


// get Product using GET Method
const allProduct = async (req, res) => {
    await connectDB(); // open MongoDB Connection

    await productTbl.find()
        .sort({ _id: -1 })
        .then(result => {
            result.map(e => console.log("Product ID: " + e._id)
            )
            res.send(result);
        });
    await closeConnection(); // closing Connection
}

// Find Product using POST Method. Passing data to req.body
const findCategoryByBody = async (req, res) => {
    await connectDB(); // open MongoDB Connection

    const { mainCat, subCat, childCat } = req.body;
    const matchCategory = await categoryTbl.find({ mainCat, subCat, childCat }); // to get list of users
    console.log(matchCategory);
    const findOne = await categoryTbl.findOne({ mainCat, subCat, childCat }); // to get a user
    console.log(matchCategory._id); // new ObjectId("65057c95fc8c30e95cd0d449")
    res.status(200).json(matchCategory);
    await closeConnection(); // closing Connection
}


// Add Product using POST Method
const addProduct = async (req, res) => {
    await connectDB(); // open MongoDB Connection

    const { title, weight, quality, detail, price, imageUrl, categoryId } = req.body;
    //console.log(mongoose.Types.ObjectId.isValid(categoryId)); // output Boolean

    // check if categoryId is MongoDB BSON ObjectId...
    if (mongoose.Types.ObjectId.isValid(categoryId)) {
        const product = await productTbl.create({ title, weight, quality, detail, price, imageUrl, category: categoryId })
        const category = await categoryTbl.findById(categoryId);

        // check if category exists
        if (category) {
            category.product.push(product._id);
            product.category = category._id;
            await category.save();
            await product.save()
                .then(result => {
                    //console.log(result);
                    res.status(201).json({ product, category })
                })
        } else {
            res.status(404).json({
                message: "Category Not Found"
            })
        }

    } else {
        res.status(404).json({
            message: "Category ID is not MongoDB BSON ObjectId"
        })
    }
    await closeConnection(); // closing Connection

};

const test = (req, res) => {
    res.send("hi..")
}

export {
    allProduct,
    addProduct,
    findCategoryByBody,
    test
}