const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");
const login = require("./controllers/login");
const ubicacion = require("./controllers/ubicacion");
const organizacion = require("./controllers/organizacion");
const multimedia = require("./controllers/multimedia");
const usuario = require("./controllers/usuario");
const alertaUsuario = require("./controllers/alertaUsuario");
const resultadosCuestionario = require("./controllers/resultadosCuestionario");
const contact = require("./controllers/contactos");
const modificacion = require("./controllers/controlModificaciones");
const informaciones = require("./controllers/informacion");
const alert = require("./controllers/alertasms");
const history = require("./controllers/historialCasos");
const pattern = require("./controllers/chatbot/pattern");
const tag = require("./controllers/chatbot/tag");
const response = require("./controllers/chatbot/response");

const app = express();
const port = 3000;
dotenv.config();
var bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
app.use(cors());
app.use(pattern);
app.use(tag);
app.use(response);
app.use(contact);
app.use(history);
app.use(informaciones);
app.use(ubicacion);
app.use(organizacion);
app.use(modificacion);
app.use(multimedia);
app.use(alertaUsuario);
app.use(alert);
app.use(usuario);
app.use(login);
app.use(resultadosCuestionario);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
