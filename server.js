const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect("mongodb://localhost/noSQL", { useNewUrlParser: true });
mongoose.set("debug", true);

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});
