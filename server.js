// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/build"));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(process.env.PORT || 3000);
