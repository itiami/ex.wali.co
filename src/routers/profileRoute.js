import express from 'express';
import * as profileCtrl from '../controllers/profileCtrl.js';
import { authenticate } from "../middleware/jwt.js";
const router = express.Router();

router.post("/", profileCtrl.createProfile);
router.get("/", authenticate, profileCtrl.findAll);
//router.get("/", profileCtrl.findAll);


export {
    router as default
}