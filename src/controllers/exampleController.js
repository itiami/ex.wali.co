import ExampleTbl from "../models/exampleModel.js";

const allExamples = async (req, res) => {
    const examples = await ExampleTbl.find().sort({ sn: -1 })
    res.send(examples)
};

const getExamplesById = async (req, res) => {
    const getExamplesById = await ExampleTbl.findOne({
        sn: req.params.id // here sn=column/field of the the table and id = router/UserRote.js router.get("/:id",
    })
    console.log(req.params.id)
    res.send(getExamplesById)
};

// post==> request url http://192.168.55.200:3010/napi/users/postAnExample
const postAnExample = async (req, res) => {
    const example = new ExampleTbl(req.body);
    await example.save(); // .save() to save to the database
    console.log(req.body); // capture req.body from postman to console
    res.status(201).send(req.body) // send data from req.body back to postman
};


const deleteExampleById = async (req, res) => {
    const delExampleBySn = await ExampleTbl.deleteOne({
        sn: req.params.id // here sn=column/field of the the table and id = router/UserRote.js router.get("/:id",
    })
    res.send(delExampleBySn)
    console.log(delExampleBySn)
}

export {
    allExamples,
    getExamplesById,
    postAnExample,
    deleteExampleById
}