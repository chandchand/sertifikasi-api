const catchAsyncErrors = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandlers");
const resMsg = require("../utils/resMsg");
const Peserta = require("../models/pesertaModel");

exports.create = catchAsyncErrors(async (req, res, next) => {
  try {
    const { Kd_skema, Nm_peserta, Jekel, Alamat, No_hp } = req.body;

    const data = await Peserta.Create({
      Kd_skema,
      Nm_peserta,
      Jekel,
      Alamat,
      No_hp,
      created_at: Date.now(),
    });

    resMsg.sendResponse(res, 200, true, "success", data);
  } catch (err) {
    res.status(500).json({ error: err.message });
    return next(new ErrorHandler("Kesalahan Server.", 500));
  }
});

exports.findAll = catchAsyncErrors(async (req, res, next) => {
  try {
    const keyword = req.query.keyword;

    let query = {};

    if (keyword) {
      query = { Nm_peserta: { $regex: new RegExp(keyword, "i") } };
    }

    const data = await Peserta.find(query);

    if (!data || data.length === 0) {
      return next(new ErrorHandler("Tidak Ada Data.", 404));
    }

    resMsg.sendResponse(res, 200, true, "success", data);
  } catch (err) {
    res.status(500).json({ error: err.message });
    return next(new ErrorHandler("Kesalahan Server.", 500));
  }
});

exports.findOneByid = catchAsyncErrors(async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Peserta.findById(id).populate({
      path: "Kd_skema",
      select: "Nm_skema Jenis Jml_unit",
    });

    if (!data) {
      return next(new ErrorHandler(`Peserta dengan id ${id} tidak ada.`, 404));
    }

    resMsg.sendResponse(res, 200, true, "success", data);
  } catch (err) {
    res.status(500).json({ error: err.message });
    return next(new ErrorHandler("Kesalahan Server.", 500));
  }
});

exports.update = catchAsyncErrors(async (req, res, next) => {
  try {
    const id = req.params.id;

    const { Kd_skema, Nm_peserta, Jekel, Alamat, No_hp } = req.body;

    const data = await Peserta.findByIdAndUpdate(
      id,
      {
        Kd_skema,
        Nm_peserta,
        Jekel,
        Alamat,
        No_hp,
      },
      { new: true }
    );

    if (!data) {
      return next(new ErrorHandler(`Peserta dengan id ${id} tidak ada.`, 404));
    }

    resMsg.sendResponse(res, 200, true, "success", data);
  } catch (err) {
    res.status(500).json({ error: err.message });
    return next(new ErrorHandler("Kesalahan Server.", 500));
  }
});

exports.delete = catchAsyncErrors(async (req, res, next) => {
  try {
    const id = req.params.id;

    const data = await Peserta.findByIdAndDelete(id);

    if (!data) {
      return next(new ErrorHandler(`Peserta dengan id ${id} tidak ada.`, 404));
    }

    resMsg.sendResponse(res, 200, true, "success", data);
  } catch (err) {
    res.status(500).json({ error: err.message });
    return next(new ErrorHandler("Kesalahan Server.", 500));
  }
});
