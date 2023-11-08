import userTbl from '../models/users_login.js';
import orderTbl from "../models/orders.js";
import mongoose from 'mongoose';
import profileTbl from '../models/profile.js';
import { connectDB, closeConnection } from "../_con/connection.js";


const createProfile = async (req, res) => {
    await connectDB(); // open MongoDB Connection

    const { userId, fname, lname, dob, contact, addressType,
        isBillingAddress, isDeliveryAddress, address, profileImg } = req.body;

    if (mongoose.Types.ObjectId.isValid(userId)) {
        const user = await userTbl.findById(userId);
        if (user) {
            // if the already created. we'll check if _id from user table exist in profile table in user key.
            const profile = await profileTbl.findOne({ user: user._id });

            if (profile) {
                // update profile.. if _id from user table match in profile table in user key.             
                profile.fname = fname;
                profile.lname = lname;
                profile.dob = dob;
                profile.contact = contact;
                profile.addressType = addressType;
                profile.isBillingAddress = isBillingAddress;
                profile.isDeliveryAddress = isDeliveryAddress;
                profile.address = address;
                profile.profileImg = profileImg;

                //await user.save();
                await profile.save()
                    .then(result => {
                        res.status(201).json(
                            {
                                message: "Profile Updated. ProfileId: " + profile._id
                            }
                        )
                    })
                /* res.status(201).json(
                    {
                        message: "Profile Updated. ProfileId: " + profile._id
                    }
                ) */

            } else {
                // create profile - if _id from user table doest not exist in profile table in user key.
                const profile = await profileTbl.create({
                    user: userId, fname, lname, dob, contact, addressType,
                    isBillingAddress, isDeliveryAddress, address, profileImg
                });

                user.profile = profile._id;
                await user.save();
                profile.save()
                    .then(result => {
                        res.status(201).json(
                            {
                                message: "Profile Crated. ProfileId: " + profile._id
                            }
                        )
                    })
            }
        } else {
            // Create user and profile - if user does exist in user collection/table
            res.status(404).json(
                {
                    message: "User Does not Exists.."
                }
            )
        }

    } else {
        res.status(404).json(
            {
                message: "userId is not correct ObjectId Type"
            }
        )
    }

    //await closeConnection(); // closing Connection
}


const findAll = async (req, res) => {
    await connectDB(); // open MongoDB Connection


    await profileTbl.find()
        .sort({ _id: -1 })
        .then(result => {
            res.status(201).json(result)
        });
    await closeConnection(); // closing Connection
}


export {
    findAll,
    createProfile
}