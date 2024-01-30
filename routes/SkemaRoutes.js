const express = require("express");
const router = express.Router();

const Skema = require("../controllers/SkemaController");

router.post("/skemas", Skema.create);
router.get("/skemas", Skema.findAll);
router.get("/skemas/id", Skema.findOneByid);
router.put("/skemas/id", Skema.update);
router.delete("/skemas", Skema.delete);

module.exports = router;
