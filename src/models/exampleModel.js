// models/User.js
import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema(
    {
        sn: Number,
        gender: String,
        fname: String,
        lname: String,
        dob: { type: Date },
        phone: String,
        address: String,
        country: String,
        email: String,
    },
    { timestamps: true },
);
exampleSchema.set('collection', 'ExampleTable');
const exampleTbl = mongoose.model("nusertables", exampleSchema)

export {
    exampleTbl as default
}