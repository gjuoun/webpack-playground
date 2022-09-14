const express = require("express");

const app = express();

app.get("/", (req, res) => {
  const a = [1, 2].at(0);

  res.send(a);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
