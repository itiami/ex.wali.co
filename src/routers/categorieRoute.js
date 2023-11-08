import { findByQuery, findOne, create } from '../controllers/categoriesCtrl.js';
import categoryTbl from "../models/categories.js";
import express from 'express';
const router = express.Router();

// findAll
router.get("/", async (req, res) => {
    const data = await findByQuery(categoryTbl, {});
    res.status(200).json(data);
})


// findOneByQuery
router.get("/findOneByQuery", async (req, res) => {
    const { mainCat, subCat, childCat } = req.body;
    const data = await findByQuery(categoryTbl, { mainCat, subCat, childCat });
    res.status(200).json(data);
})


router.get('/:id', async (req, res) => {
    const data = await findOne(categoryTbl, { _id: req.params.id });
    res.json(data);
});

router.post('/', async (req, res) => {
    const { mainCat, subCat, childCat } = req.body;
    const data = await findByQuery(categoryTbl, { mainCat, subCat, childCat });
    if (data) {
        res.status(404).json({ message: "Category Exists" });
    } else {
        const newDoc = await create(categoryTbl, req.body);
        res.status(201).json(newDoc);
    }

});




export {
    router as default
}