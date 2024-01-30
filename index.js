const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const ErrorHandler = require("./utils/errorHandlers");
const error = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db"); // Import konfigurasi koneksi basis data
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const skema = require("./routes/SkemaRoutes");
const peserta = require("./routes/PesertaRoutes");

app.use("/api", skema);
app.use("/api", peserta);

app.use("*", (req, res, next) => {
  return next(new ErrorHandler("PAGE NOT FOUND", 404));
}),
  app.use(error.errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
