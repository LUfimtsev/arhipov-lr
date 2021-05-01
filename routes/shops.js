const { Router } = require("express");
const Shop = require("../models/Shop");
const router = Router();

router.get("/getAll", [], async (req, res) => {
  try {
    const shops = await Shop.find();
    res.status(201).json({ data: shops });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
