import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        orderNo: Number,
        orderStatus: String, // i.e delivered, undelivered, pause, cancell, in Preparation etc...
        totalAmount: {
            type: Number,
            required: true
        },
        userLogin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userProfileSchema"
        },
        payment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "paymentSchema"
        },
        product: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "productSchema"
            }
        ],
    },
    { timestamps: true }
);

// set collection name in mongoDB Server
orderSchema.set("collection", "order");

const orderTbl = mongoose.model("orderSchema", orderSchema);

export {
    orderTbl as default
}
