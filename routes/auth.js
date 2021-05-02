const { Router } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = Router();

// /api/auth/register
router.post("/register", [], async (req, res) => {
  try {
    const { login, password } = req.body;

    const candidate = await User.findOne({ login });

    if (candidate) {
      return res
        .status(400)
        .json({ message: "Такой пользователь уже существует" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      login,
      password: hashedPassword,
      isAdmin: false,
    });

    await newUser.save();

    res.status(201).json({ userId: newUser.id });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

// /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({ login });

    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }

    const isPasswordsMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordsMatch) {
      return res
        .status(400)
        .json({ message: "Неверный пароль, попробуйте снова" });
    }

    res.json({ userId: user.id });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
