
const router = require("express").Router();
const { createUser } = require("../controllers/userController");
const { authenticateUser } = require("../controllers/authController");
const { createGroup, updateGroup } = require("../controllers/groupController");
const { check } = require("express-validator");
const auth = require("../middlewares/auth");

// api/users
router.post(
  "/users",
  [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe tener mínimo 6 caracteres").isLength({
      min: 6,
    }),
  ],
  createUser
);

// api/auth
router.post(
  "/auth",
  [
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe tener mínimo 6 caracteres").isLength({
      min: 6,
    }),
  ],
  authenticateUser
);

// api/group
router.post(
  "/group",
  auth,
  [
    check("name", "Agrega el nombre del grupo").notEmpty(),
    check("grade", "Agrega el grado").notEmpty(),
    check("cicle", "Agrega el ciclo").notEmpty(),
  ],
  createGroup
);

router.put(
  "/group/:id",
  auth,
  [
    check("name", "Agrega el nombre del grupo").notEmpty(),
    check("grade", "Agrega el grado").notEmpty(),
    check("cicle", "Agrega el ciclo").notEmpty(),
  ],
  updateGroup
);

module.exports = router;
