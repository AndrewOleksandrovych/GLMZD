const express = require("express");
const router = express.Router();
const Administrator = require("../models/administrator");

router.get("/login", function (req, res) {
  res.render("auth_page/login_page");
});

router.post("/login", async (req, res) => {
  const { login, password } = req.body;

  console.log(req.body)
  console.log(password)

  try {
    const admin = await Administrator.findOne({  login });

    console.log(admin)

    if (admin && admin.password === password) {
      req.session.user = {
        login: admin.login,
        role: admin.role,
        fullName: admin.fullName,
        soldierID: admin.soldierID,
        companyID: admin.companyID,
      };
      res.redirect("/menu/");
    } else {
      res.status(401).send("Invalid login credentials");
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to log out");
    }
    res.redirect("/auth/login");
  });
});

module.exports = router;
