const mongoose = require("mongoose");

const SkemaModel = new mongoose.Schema({
  Kd_skema: {
    type: String,
    required: true,
  },
  Nm_skema: {
    type: String,
    required: true,
  },
  Jenis: {
    type: String,
    enum: ["KKNI", "Klaster"],
    required: true,
  },
  Jml_unit: {
    type: Number,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("SkemaModels", SkemaModel);
