import userTbl from '../models/users_login.js';
import { connectDB, closeConnection } from "../_con/connection.js";
import { authenticate, accessToken, encorder } from "../middleware/jwt.js";

// POST Request to create User..
const createUser = async (req, res) => {
    await connectDB();
    const { username, password, email } = req.body;

    if (Object.keys(req.body).length === 0) {
        console.log("Please Insert Data");
        res.status(404).json({
            message: "Please Insert Data"
        });
    }

    if (await userTbl.findOne({ username })) {
        console.log(`User: ${username} Exists`);
        res.status(404).json({
            message: `User: ${username} Exists`
        });
    } else if (await userTbl.findOne({ email })) {
        console.log(`Email: ${email} Exists`);
        res.status(404).json({
            message: `Email: ${email} Exists`
        });
    } else {
        const user = await userTbl.create({ username, password, email });
        user.save();
        console.log(req.body);
        res.status(201).json(req.body);
    }

    //await closeConnection(); // closing Connection
};



// GET Request
const findAll = async (req, res) => {
    await connectDB(); // open MongoDB Connection

    //const profile = await profileTbl.findById()
    await userTbl.find()
        //.populate("user")
        .sort({ _id: -1 })
        .then(result => {
            result.map(e => console.log("userID: " + e._id)
            )
            res.send(result);
        });

    await closeConnection(); // closing Connection
};

// GET Request
const findOneByParam = async (req, res) => {
    await connectDB(); // open MongoDB Connection

    const getUserById = await UserTbl.findOne({
        _id: req.params.id
    })

    console.log(req.params.id)
    console.log(req.body) // here we aren't using HttpRequstBody so will return empty..
    res.send(getUserById)

    await closeConnection(); // closing Connection
};


const findFilterReqBody = async (req, res) => {
    await connectDB(); // open MongoDB Connection

    const { username, password } = req.body;

    //  find() method returns documents inside Array []. 
    // this is a best choise when we create a search by filter
    const matchUsers = await userTbl.find({ username, password }); // to get list of users
    if (matchUsers.length > 0) {
        console.log(matchUsers);
        res.status(200).json(matchUsers);

    } else {
        console.log("Not Found");
        res.status(200).json({
            message: "Not Found"
        });
    }

    await closeConnection(); // closing Connection
}

// it's a POST Request as we send document through req.body
//Advantage of the method we can pass multiple Model Properties. i.e. username, password etc.
const findOneReqBody = async (req, res) => {
    await connectDB(); // open MongoDB Connection

    const { username, password } = req.body;

    // findOne() method returns One document as an Object {}. 
    // Note: - If match multiple it returns only the first Document
    // this is a best choise when we create a login system to check if user exist

    if (username === "" && password === "") {
        console.log("username or password can not be empty");
        res.status(204).json({
            message: "username or password can not be empty"
        });
    } else {
        const findOneUser = await userTbl.findOne({ username });
        if (findOneUser && await findOneUser.comparePassword(password)) {
            /* console.log(findOneUser);
            res.status(200).json(findOneUser); */
            console.log({
                auth: true,
                //token: accessToken({ username: findOneUser.username, password: findOneUser.password })
                // sending a bcrypted string inside the JWT token insted username or password
                token: accessToken({ key: (await encorder(username)).toString() })
            });
            res.status(200).json({
                auth: true,
                //token: accessToken({ username: findOneUser.username, password: findOneUser.password })
                // sending a bcrypted string inside the JWT token insted username or password
                token: accessToken({ key: (await encorder(username)).toString() })
            });
        } else {
            console.log(req.body);
            res.status(404).json({
                message: "user Not Found"
            });
        }
    }
    await closeConnection(); // closing Connection
};


// POST Request same as above but the usages is as below..
/* 
    {
        "propsKey": "username",
        "propsVal": "Violet_Crist9"
    }
*/
const findReqBody_keyVal = async (req, res) => {
    await connectDB(); // open MongoDB Connection

    const { propsKey, propsVal } = req.body;

    // here matchAndfindAll() will return as Array
    const matchAndfindAll = await userTbl.find({ [propsKey]: propsVal });
    /* if (matchAndfindAll.length > 0) {
        console.log(matchAndfindAll);
        res.status(200).json(matchAndfindAll);
    } else {
        console.log("Not Found");
        res.status(404).json({
            message: "Not Found"
        });
    } */

    // here findOnlyFirst() will return as Json Object
    const findOnlyFirst = await userTbl.findOne({ [propsKey]: propsVal });
    if (findOnlyFirst) {
        console.log(findOnlyFirst);
        res.status(200).json(findOnlyFirst);

    } else {
        console.log("Not Found");
        res.status(404).json({
            message: "Not Found"
        });
    }

    await closeConnection(); // closing Connection

};


export {
    createUser,
    findAll,
    findOneByParam,
    findFilterReqBody,
    findOneReqBody,
    findReqBody_keyVal
}