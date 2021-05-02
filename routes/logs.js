const { Router } = require("express");
const Log = require("../models/Log");
const User = require("../models/User");
const router = Router();

router.post("/write", [], async (req, res) => {
  try {
    const { userId, actionName, date } = req.body;
    await new Log({ userId, actionName, date }).save();
    res.status(201).json({ message: "Лог записан" });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.post("/getByUser", [], async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId });
    let logs;
    if (user.isAdmin) {
      logs = await Log.find();
    } else {
      logs = await Log.find({ userId });
    }
    let uniqueIds = [];

    for (let str of logs) {
      if (!uniqueIds.includes(str.userId.toString())) {
        uniqueIds.push(str.userId.toString());
      }
    }

    const idToLoginArray = [];

    for (let i = 0; i < uniqueIds.length; i++) {
      let user = await User.findOne({ _id: uniqueIds[i] });
      idToLoginArray.push({ id: uniqueIds[i], login: user.login });
    }

    res
      .status(201)
      .json({ logins: idToLoginArray, data: logs, isAdmin: user.isAdmin });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
