const express = require("express");
const router = express.Router();

const Peserta = require("../controllers/PesertaController");

router.post("/peserta", Peserta.create);
router.get("/peserta", Peserta.findAll);
router.get("/peserta/:id", Peserta.findOneByid);
router.put("/peserta/:id", Peserta.update);
router.delete("/peserta/:id", Peserta.delete);

module.exports = router;
