const mongoose = require("mongoose");

const PesertaModel = new mongoose.Schema({
  Kd_skema: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "SkemaModels",
    foreignField: "Kd_skema",
  },
  Nm_peserta: {
    type: String,
    required: true,
  },
  Jekel: {
    type: String,
    enum: ["Pria", "Wanita"],
    required: true,
  },
  Alamat: {
    type: String,
    required: true,
  },
  No_hp: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("PesertaModel", PesertaModel);
