const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());

const db = require("./models");

app.use("/api/users", require("./routes/users-router"));
app.all("*", (req, res) => {
  res.status(404).send({ message: "Route not found" });
});

db.sequelize
  .sync()
  .then(() => {
    app.listen(3001, () => {
      console.log("App is runnig on port http://localhost:3001");
    });
  })
  .catch((error) => {
    console.log(error);
  });
