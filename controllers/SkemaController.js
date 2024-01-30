const catchAsyncErrors = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandlers");
const resMsg = require("../utils/resMsg");
const Skema = require("../models/skemaModel");

exports.create = catchAsyncErrors(async (req, res, next) => {
  try {
    const { Nm_skema, Jenis, Jml_unit } = req.body;

    const awalan = "SKM-";
    const digitAngka = 3;

    const lastSkema = await Skema.findOne().sort({ Kd_skema: -1 });

    let urutanAngka = 1;
    if (lastSkema) {
      const lastNumber = parseInt(lastSkema.Kd_skema.slice(awalan.length));
      urutanAngka = lastNumber + 1;
    }

    const formattedNumber = urutanAngka.toString().padStart(digitAngka, "0");

    const Kd_skema = awalan + formattedNumber;

    const data = await Skema.Create({
      Kd_skema,
      Nm_skema,
      Jenis,
      Jml_unit,
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
    const data = await Skema.find({});

    if (!data) {
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
    const data = Skema.findById(id);

    if (!data) {
      return next(new ErrorHandler(`Skema dengan id ${id} tidak ada.`, 404));
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

    const { Nm_skema, Jenis, Jml_unit } = req.body;

    const data = await Skema.findByIdAndUpdate(
      id,
      {
        Nm_skema,
        Jenis,
        Jml_unit,
      },
      { new: true }
    );

    if (!data) {
      return next(new ErrorHandler(`Skema dengan id ${id} tidak ada.`, 404));
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

    const data = await Skema.findByIdAndDelete(id);

    if (!data) {
      return next(new ErrorHandler(`Skema dengan id ${id} tidak ada.`, 404));
    }

    resMsg.sendResponse(res, 200, true, "success", data);
  } catch (err) {
    res.status(500).json({ error: err.message });
    return next(new ErrorHandler("Kesalahan Server.", 500));
  }
});
