
const router = require("express").Router();

const { authenticateUser } = require("../controllers/authController");
const { check } = require("express-validator");

// api/auth
router.post(
  "/",
  [
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe tener mínimo 6 caracteres").isLength({
      min: 6,
    }),
  ],
  authenticateUser
);

module.exports = router;