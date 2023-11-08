import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import path from "path";
import url from "url";
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
dotenv.config({ path: ".env" });
const __filename = url.fileURLToPath(import.meta.url);
global.__dirname = path.dirname(__filename); // making __dirname as global variable
const httpServer = createServer(app);
const io = new Server(httpServer);

import categorieRoute from './src/routers/categorieRoute.js';
import productRouter from './src/routers/productRoute.js';
import userRouter from "./src/routers/userRoute.js"
import profileRouter from "./src/routers/profileRoute.js"
import osNetRouter from './src/routers/netRoute.js';
import delRoutes from "./src/process_network/deleteContent.js";




// CORS Policy
const corsPolicyByExpress = (req, res, next) => {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
    );

    next();
}

//CORS Middleware: Choise_1
//app.use(corsPolicyByExpress);


//CORS Middleware: Choise_2
// using cors library
app.use(
    cors({
        //origin: 'http://192.168.1.200:4200',
        origin: '*',
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);



app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// express.static() is use to make accessable resources to use css, images etc..
app.use(express.static(__dirname + "/resources"));

app.get("/static", (req, res) => {
    res.sendFile(__dirname + "/resources/data/static.html")
})

app.get("/", (req, res) => {
    res.status(201).render("index.ejs"); // from EJS staticViews directory
})



// DELETE Directory Content...
app.use("/del", delRoutes);


// http://192.168.1.200:3090/api/net
app.use("/api/net", osNetRouter);

// http://192.168.1.200:3090/api/category
app.use("/api/category", categorieRoute);

// http://192.168.1.200:3090/api/products
app.use("/api/products", productRouter);

// http://192.168.1.200:3090/api/user
app.use("/api/user", userRouter);

// http://192.168.1.200:3090/api/profile
app.use("/api/profile", profileRouter);

app.use("/api/user", userRouter);
app.listen(process.env.__NODE_SERVER_PORT, process.env.__NODE_SERVER_HOST, function () {
    console.log(`Server is running on: 
    http://${process.env.__NODE_SERVER_HOST}:${process.env.__NODE_SERVER_PORT}`)
})

