const express = require("express");
const router = express.Router();

const Skema = require("../controllers/SkemaController");

router.post("/skema", Skema.create);
router.get("/skemas", Skema.findAll);
router.get("/skema/:id", Skema.findOneByid);
router.put("/skema/:id", Skema.update);
router.delete("/skema/:id", Skema.delete);

module.exports = router;
