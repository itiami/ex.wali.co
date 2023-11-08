import express from "express";
import * as ExampleController from "../controllers/exampleController.js";
const router = express.Router()

router.get("/", ExampleController.allExamples)
router.get("/:id", ExampleController.getExamplesById)
router.post("/", ExampleController.postAnExample)
router.delete("/:id", ExampleController.deleteExampleById)

export {
    router as default
}