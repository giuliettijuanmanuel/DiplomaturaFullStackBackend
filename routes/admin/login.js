var express = require("express");
var router = express.Router();
var usuariosModel = require("./../../models/usuarioModel");

router.get("/", function (req, res, next) {
  res.render("admin/login", {
    layout: "admin/layout",
  });
});

router.post("/", async (req, res, next) => {
  try {
    var email = req.body.email;
    var password = req.body.password;
    var data = await usuariosModel.getUserByUsernameAndPassword(
      email,
      password
    );

    if (data != undefined) {
      req.session.ID_usuario = data.ID_usuario;
      req.session.email = data.email;
      res.redirect("/admin/novedades");
    } else {
      res.render("admin/login", {
        error: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.render("admin/login");
});
module.exports = router;
