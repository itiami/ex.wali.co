import { connectDB, closeConnection } from "../_con/connection.js";

export const findByQuery = async (Model, query) => {
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


// delete document - findByIdAndDelete
export const deleteByID = async (docModel, query) => {
    await connectDB();
    const doc = await docModel.findOne(query);

    if (doc) {
        const data = await docModel.findByIdAndDelete(doc._id);
        await closeConnection();
        console.log("Document deleted. ID: ", doc._id);
        return data;
    } else {
        console.log("Document not found");
        return "Document not found"
    }
}


// delete document - findByIdAndDelete
export const deleteMulti = async (docModel, query) => {
    await connectDB();
    const data = await docModel.find(query);
    if (data) {
        await docModel.deleteMany(query).exec()
        await closeConnection();
        console.log(data);

        return data;
    } else {
        console.log("No Data Found");
        return "No Data Found"
    }
}