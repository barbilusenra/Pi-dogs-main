const { Router } = require("express");
const { getTemperaments } = require("../controllers/getTemperaments");

const tempRouter = Router();

tempRouter.get("/", async (req, res) => {
  try {
    let temperaments = await getTemperaments();
    res.status(200).json(temperaments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  tempRouter
};
