import express from 'express';
import * as productCtrl from '../controllers/productCtrl.js';


const router = express.Router();

router.post("/", productCtrl.addProduct);
router.post("/matchCat", productCtrl.findCategoryByBody);
router.get("/", productCtrl.allProduct);
router.get("/test", productCtrl.test);


export {
    router as default
}