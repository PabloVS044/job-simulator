const express = require("express");
const cors = require("cors");
const seriesRouter = require("./routes/series");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/series", seriesRouter);

app.listen(PORT, () => {
  console.log(`API corriendo en puerto ${PORT}`);
});
