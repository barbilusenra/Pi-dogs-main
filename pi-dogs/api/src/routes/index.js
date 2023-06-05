const { Router } = require('express');
const {dogsRouter} = require("./dogsRouter");
const {tempRouter} = require("./tempRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use("/dogs", dogsRouter);

router.use("/temperaments", tempRouter);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
