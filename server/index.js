
require("dotenv").config();

const express = require("express");
const conectarDB = require("./config/db");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const groupRoutes = require("./routes/group");
const studentRoutes = require("./routes/student");

//crear el servidor
const app = express();

//conectar a la base de datos
conectarDB();

//middlewares
app.use(express.json({ extended: true }));

//puerto de la app
const PORT = process.env.PORT || 4000;

//Rutas
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/student", studentRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
