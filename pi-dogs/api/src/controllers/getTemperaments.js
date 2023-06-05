require("dotenv").config();
const axios = require("axios");
const { Temperament } = require("../db");
const { API_KEY } = process.env;

// Obtiene todos los temperamentos existentes.
// Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo).
// Luego de obtenerlos de la API,y deben ser guardados en la base de datos para su posterior consumo desde allí.

const getTemperaments = async () => {
  try {
    const apiTemperament = await axios.get(
      `https://api.thedogapi.com/v1/breeds`
    );
    const temperaments = [];
    apiTemperament.data.forEach((breed) => {
      if (breed.temperament) {
        const breedTemperaments = breed.temperament.split(", ");
        temperaments.push(...breedTemperaments);
      }
    });

    for (const temp of temperaments) {
      await Temperament.findOrCreate({
        where: {
          name: temp,
        },
      });
    }

    const tempList = await Temperament.findAll();
    return tempList;
  } catch (error) {
    throw new Error("Error desconocido al obtener los temperamentos");
  }
};


module.exports = {
  getTemperaments
};
