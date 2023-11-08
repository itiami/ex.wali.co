import express from 'express';
import * as userCtrl from '../controllers/userCtrl.js';
const router = express.Router();


router.post("/", userCtrl.createUser);
router.get("/", userCtrl.findAll);
router.post("/findFilterReqBody", userCtrl.findFilterReqBody);
router.post("/findOneReqBody", userCtrl.findOneReqBody);
router.post("/findReqBody_keyVal", userCtrl.findReqBody_keyVal);
//router.route("*");



export {
    router as default
}