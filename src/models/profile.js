import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userLoginSchema"
        },
        fname: String,
        lname: String,
        dob: Date,
        contact: String,
        addressType: String,
        isBillingAddress: Boolean,
        isDeliveryAddress: Boolean,
        address: {
            streetNameNum: String,
            city: String,
            coutry: String
        },
        profileImg: String
    },
    {
        timestamps: true
    }
);

// set collection name in mongoDB Server
profileSchema.set("collection", "user_profile");

const profileTbl = mongoose.model("profileSchema", profileSchema);

export {
    profileTbl as default
}