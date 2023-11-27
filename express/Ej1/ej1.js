const express = require("express");

const PUERTO = 3000;
const app = express();

app.listen(PUERTO, () => {

    console.log(`Servidor levantado en el puerto ${PUERTO}`);

});