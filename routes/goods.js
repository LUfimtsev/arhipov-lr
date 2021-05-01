const { Router } = require("express");
const Good = require("../models/Good");
const router = Router();

router.get("/getAll", [], async (req, res) => {
  try {
    const goods = await Good.find();
    res.status(201).json({ data: goods });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
