
require("dotenv").config();

const express = require("express");
const conectarDB = require("./config/db");
const routes = require("./routes/index")

//crear el servidor
const app = express();

//conectar a la base de datos
conectarDB();

//middlewares
app.use(express.json({ extended: true }));

//puerto de la app
const PORT = process.env.PORT || 4000;

//Rutas
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
