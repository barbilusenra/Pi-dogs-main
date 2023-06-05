const axios = require("axios");
require("dotenv").config();
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

// -------------- GET DOGS id-raza ----------------//
// Esta ruta obtiene el detalle de una raza específica. Es decir que devuelve un objeto con la información pedida en el detalle de un perro.
// La raza es recibida por parámetro (ID).
// Tiene que incluir los datos de los temperamentos asociadas a esta raza.
// Debe funcionar tanto para los perros de la API como para los de la base de datos.

const getDogsId = async (id) => {
  console.log(id);
  if (!id.includes("-")) {
    const apidogs = await axios.get(
      `https://api.thedogapi.com/v1/breeds/${id}`
    );
    // Realizamos la consulta a la API externa
    const dogFromApi = apidogs.data;
    console.log(apidogs);
    // si encontramos la raza en la API, retornamos los datos
    return {
      id: dogFromApi.id,
      name: dogFromApi.name,
      height: dogFromApi.height.metric,
     weight: dogFromApi.weight.metric,
      bred_for: dogFromApi.bred_for,
      life_span: dogFromApi.life_span,
      image: `https://cdn2.thedogapi.com/images/${dogFromApi.reference_image_id}.jpg`,
      temperament: dogFromApi.temperament,
    };
  } else {
    // si no encontramos la raza en la API, buscamos en la base de datos
    const dogFromdb = await Dog.findByPk(id, {
      include: {
        model: Temperament,
        through: { attributes: [] },
      },
    });
    console.log(dogFromdb);
    if (dogFromdb) {
      // si encontramos la raza en la base de datos, retornamos los datos
      return {
        id: dogFromdb.id,
        name: dogFromdb.name,
        height: dogFromdb.height,
        weight: dogFromdb.weight,
        life_span: dogFromdb.life_span,
        image: dogFromdb.image.url,
        temperament: dogFromdb.Temperament.map((t) => t.name),
      };
    } else {
      return "Perro no encontrado";
    }
  }
};

module.exports = {
  getDogsId,
};
