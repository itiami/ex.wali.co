// models/category.js
import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
    {
        mainCat: String,
        subCat: String,
        childCat: String,
        product: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "productSchema",
            }
        ]
    },

    { timestamps: true },
);

// set collection name in mongoDB Server
categorySchema.set('collection', 'category');
// mongoose.model(name, schema)
/*so it is required to give a name. although there are no usage for this moment
so i use the name same as schemas..
*/
const categoryTbl = mongoose.model("categorySchema", categorySchema)

export {
    categoryTbl as default
}
