const { Router } = require("express");
const { getDogs } = require("../controllers/getDogs");
const { getDogsId } = require("../controllers/getDogsById");
const { Temperament } = require("../db");
const { getDogsByName } = require("../controllers/getDogsByName");
const { postDogs } = require("../controllers/postDogds");

const dogsRouter = Router();

dogsRouter.get("/", async (req, res) => { 
  const { name } = req.query;
  try { 
    
    if (name) {
      const dogsName = await getDogsByName(name)
      if (dogsName.length === 0) {
       res.status(404).json({ message: `No se encontraron resultados para "${name}".` });
       return
      }
      res.status(200).json(dogsName);
      return
    }
    // si no se proporciona un nombre en la consulta, obtener todas las razas
    const allDogs = await getDogs();
    res.status(200).json(allDogs);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
});

dogsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dogsId = await getDogsId(id);
    if (Array.isArray(dogsId)) {
      res.status(200).json(dogsId[0]);
    } else {
      res.status(200).json(dogsId);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

dogsRouter.post("/", async (req, res) => {
  const { name, image, height, weight, life_span, temperament } = req.body;
  try {
    const new_dog = await postDogs(
      name,
      image,
      height,
      weight,
      life_span,
      temperament
    );
    const tempdb = await Temperament.findAll({
      where: {
        name: temperament,
      },
    });
    console.log("*************", temperament)
    new_dog.addTemperament(tempdb);

    res.status(200).json(new_dog);

  } catch (error) {

    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  dogsRouter
};
