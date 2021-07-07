const router = require("express").Router();
const { createUser } = require("../controllers/userController");
const { check } = require("express-validator");

// api
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe tener mínimo 6 caracteres").isLength({
      min: 6,
    }),
  ],
  createUser
);

// api/users
router.get("/users", (req, res) => {
  res.send("Hola usuarios del universo");
});

module.exports = router;
