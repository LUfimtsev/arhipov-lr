const { Router } = require("express");
const Contractor = require("../models/Contractor");
const router = Router();

router.get("/getAll", [], async (req, res) => {
  try {
    const contractors = await Contractor.find();
    res.status(201).json({ data: contractors });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
