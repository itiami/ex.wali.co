import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const userLoginSchema = new mongoose.Schema(
    {
        username: { type: String, },
        password: { type: String, },
        email: { type: String },
        //profile: { type: mongoose.Schema.Types.ObjectId, ref: "userProfileSchema" },
        //order: [{ type: mongoose.Schema.Types.ObjectId, ref: "orderSchema" }]
    },
    { timestamps: true }
);


// Hash the password before saving it to the database
userLoginSchema.pre(
    'save',
    async function (next) {
        const user = this;
        if (!user.isModified('password')) return next();
        try {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            next();
            console.log(user.password);
        } catch (error) {
            return next(error);
        }
    });


// Compare the given password with the hashed password in the database
userLoginSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};


// set collection name in mongoDB Server
userLoginSchema.set("collection", "user");

const user_loginTbl = mongoose.model("userLoginSchema", userLoginSchema);

export {
    user_loginTbl as default
}
