const axios = require("axios");
require("dotenv").config();
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const { Op } = require("sequelize");

// ------------POST-------------//

const postDogs = async (
    name,
     image, 
     height, 
     weight, 
     life_span, 
     temperament
     ) => {
const [newDog, boolean] = await Dog.findOrCreate({
    where: {
        name: {[Op.iLike]: `%${name}%`}
    },
    defaults: {
        name,
        image,
        height,
        weight,
        temperament,
        life_span,
    },
});


if(!boolean) throw new Error("El perro ya existe");
return newDog

};

module.exports = {
    postDogs
};