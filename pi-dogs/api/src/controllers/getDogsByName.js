const axios = require("axios");
require("dotenv").config();
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const { Op } = require("sequelize");

//----------GET DOGS by NAME ----------------//
// Esta ruta debe obtener todas aquellas razas de perros que coinciden con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe la raza, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.

const getDogsByName = async (name) => {
  try {
    // obtenemos los perros de la Api
    const apiNames = await axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${name}`
    );

    const apiNamesDogs = apiNames.data.map((dog) => ({
      id: dog.id,
      name: dog.name,
      height: dog.height && dog.height.metric,
      weight: dog.weight && dog.weight.metric,
      life_span: dog.life_span,
      image: dog?.reference_image_id
        ? dog.id === 15 || dog.id === 125 || dog.id === 212
          ? `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.png`
          : `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`
        : null,
      temperament: dog.temperament,
    }));

    // obtenemos los juegos desde la base de datos
    const dbNames = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Temperament,
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          }
        }
      },
    });

    const dbDogsList =
      dbNames &&
      dbNames.map((dog) => ({
        id: dog.id,
        name: dog.name,
        height: dog.height,
        weight: dog.weight,
        life_span: dog.life_span,
        image: dog.image.url,
        temperament: dog.Temperament.map((t) => t.name),
      }));

    // combinamos los resultados de la API y la base de datos
    const allNamesDogs = apiNamesDogs.concat(dbDogsList);
    return allNamesDogs;
  } catch (error) {
    throw new Error(`Error al obtener la raza de perro por nombre.`);
  }
};

module.exports = {
  getDogsByName,
};
