const axios = require("axios");
require("dotenv").config();
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

// -----------GET DOGS --------------- //
// obtener un arreglo de objetos, donde cada objeto es la raza de un perro.

const getDogs = async () => {
  const dogs = await axios.get(`https://api.thedogapi.com/v1/breeds`);
  // mapeamos los datos de la Api para que queden como los necesitamos
  const apiDogs = dogs.data.map((dog) => ({
    id: dog.id,
    name: dog.name,
    height: dog.height && dog.height.metric,
    weight: dog.weight && dog.weight.metric,
    life_span: dog.life_span,
    image: dog.image.url,
    temperament: dog.temperament,
  }));

  const dbDogs = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const dogsDb = dbDogs.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      height: dog.height,
      weight: dog.weight,
      life_span: dog.life_span,
      image: dog.image,
      temperament: dog.Temperament.map((t) => t.name),
    };
  });

  const allDogs = apiDogs.concat(dogsDb);
  if (allDogs) {
    return allDogs;
  } else {
    throw Error("No se encontraron resultados");
  }
};

module.exports = {
  getDogs,
};
