const { Router } = require("express");
const Stock = require("../models/Stock");
const router = Router();

router.get("/getAll", [], async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(201).json({ data: stocks });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
