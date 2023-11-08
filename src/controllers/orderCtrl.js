import { connectDB, closeConnection } from "../_con/connection.js";

export const findAll = async (Model, query) => {
    await connectDB();
    const data = await Model.find(query);
    await closeConnection();
    return data;
}

export const findOne = async (Model, query) => {
    await connectDB();
    const data = await Model.findOne(query);
    await closeConnection();
    return data;
}

export const create = async (Model, doc) => {
    await connectDB();
    const newDoc = new Model(doc);
    const result = await newDoc.save();
    await closeConnection();
    return result;
}