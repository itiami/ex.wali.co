// delContent.js

import fs from 'node:fs/promises';
import path from 'node:path';
import express from 'express';
const router = express.Router();


const delContent = async (req, res) => {
    try {
        const directory = "/var/www/ex.wali.co/resources/dist/";

        for (const file of await fs.readdir(directory)) {
            await fs.unlink(path.join(directory, file));
        }
        console.log("deleted");
        res.status(201).json("deleted..")
    } catch (err) {
        console.log("message: ", err.message);
        res.status(404).json(err.message)
    }

}


router.get("/", delContent);

export {
    router as default
}



