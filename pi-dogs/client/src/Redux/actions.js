import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_DOGS_NAME = "GET_DOGS_NAME";
export const GET_DOGS_BY_ID = "GET_DOGS_BY_ID";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
export const ORDER_ALPHABETIC = "ORDER_ALPHABETIC";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const POST_DOG = "POST_DOG";

export const getDogs = () => {
  return async function (dispatch) {
    const response = await axios("http://localhost:3001/dogs");
    return dispatch({
      type: GET_DOGS,
      payload: response.data,
    });
  };
};

export const getDogsByName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/dogs?name=${name}`
      );
      return dispatch({
        type: GET_DOGS_NAME,
        payload: response.data,
      });
    } catch (error) {
      return {
        error: "No hay resultados para ese nombre."
      };
      
    }
  };
};

export const postDog = (data) => {
  return async function (dispatch) {
      try {
          const res = await axios.post(`/dogs`, data);
          return res;
      } catch (error) {
          return dispatch ({
              type: POST_DOG,
          })
      }
  };
};

export const getDetailDogs = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/dogs/${id}`
      );
      return dispatch({
        type: GET_DOGS_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      return {
        error: "No details to show",
        originalError: error,
      };
    }
  };
};
// export const createDog = (payload) => {
//   return async (dispatch) => {
//     try {
//       console.log(payload)
//       const response = await axios.post(`http://localhost:3001/dogs`, payload);
//       return response.data;
//     } catch (error) {
//       return {
//         error: "No es posible crear este perro, intente nuevamente."
//       }
//     }
//   }
// }

export const getTemperaments = () => {
   return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/temperaments`);
      dispatch({
        type: GET_TEMPERAMENTS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterTemperaments = (value) => {
  return {
    type: FILTER_BY_TEMPERAMENTS,
    payload: value,
  };
};

export const orderAlphabetic = (value) => {
  return {
    type: ORDER_ALPHABETIC,
    payload: value,
  };
};

export const orderByWeight = (value) => {
  return {
    type: ORDER_BY_WEIGHT,
    payload: value,
  }
}

export const filterOrigin = (value) => {
  return {
    type: FILTER_ORIGIN,
    payload: value,
  }
}