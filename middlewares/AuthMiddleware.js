const { verify } = require("jsonwebtoken");
require("dotenv").config();

const validateToken = (req, res, next) => {
  const accessToken = req.header("authorization");

  if (!accessToken)
    return res
      .status(401)
      .send({ error: "Unauthorized", message: "Not logged in" });

  try {
    const validToken = verify(accessToken, process.env.SECRET_TOKEN);
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

const staffToken = (req, res, next) => {
  const accessToken = req.header("authorization");

  if (!accessToken) return res.status(401).send({ error: "Not logged in" });

  try {
    const validToken = verify(accessToken, process.env.SECRET_TOKEN);
    req.user = validToken;
    if (req.user.role === "staff" || req.user.role === "admin") {
      return next();
    } else {
      res.status(401).send({
        error: "Unauthorized",
        message: "This user is not allowed for this service",
      });
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

const adimnToken = (req, res, next) => {
  const accessToken = req.header("authorization");

  if (!accessToken) return res.status(401).send({ error: "Not logged in" });

  try {
    const validToken = verify(accessToken, process.env.SECRET_TOKEN);
    req.user = validToken;
    if (req.user.role === "admin") {
      return next();
    } else {
      res.status(401).send({
        error: "Unauthorized",
        message: "This user is not allowed for this service",
      });
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = {
  validateToken,
  adimnToken,
  staffToken,
};
