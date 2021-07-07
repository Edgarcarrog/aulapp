const router = require("express").Router();
const { createUser } = require("../controllers/userController");

// api
router.post("/", createUser);

// api/users
router.get("/users", (req, res) => {
  res.send("Hola usuarios del universo");
});

module.exports = router;
