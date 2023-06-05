import {
  GET_DOGS,
  GET_DOGS_NAME,
  GET_DOGS_BY_ID,
  GET_TEMPERAMENTS,
  FILTER_BY_TEMPERAMENTS,
  ORDER_ALPHABETIC,
  ORDER_BY_WEIGHT,
  FILTER_ORIGIN,
  POST_DOG
} from "./actions";

const initialState = {
  dogs: [],
  allDogs: [],
  dogsById: {},
  temperaments: [],
  tempDogs:[],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: [...action.payload],
        allDogs: [...action.payload],
        tempDogs: [...action.payload],
      };

    case GET_DOGS_NAME:
      console.log(action.payload)
    return {
        ...state,
        dogs: action.payload,
      };

    case GET_DOGS_BY_ID:
      return {
        ...state,
        dogsById: action.payload,
      };
      
    case GET_TEMPERAMENTS:
      console.log(action.payload);
      return {
        ...state,
        temperaments: action.payload ? [...action.payload] : [],
      };

    case FILTER_BY_TEMPERAMENTS:
      const allDogs = state.allDogs;

      const temperamentFiltered =
        action.payload === "temp"
          ? allDogs
          : allDogs.filter((el) => {
              if (typeof el.temperaments === "string")
                return el.temperaments.includes(action.payload);
              if (Array.isArray(el.temperaments)) {
                return el.temperaments.includes(action.payload);
              }
              return false;
            });

      console.log(action.payload);

      return {
        ...state,
        allDogs: temperamentFiltered,
      };

      case POST_DOG:
        return { ...state };

    case ORDER_ALPHABETIC:
      if (action.payload === "Ascendente") {
        return {
          ...state,
          dogs: [...state.dogs.sort((a, b) => a.name.localeCompare(b.name))],
        };
      } else {
        return {
          ...state,
          dogs: [...state.dogs.sort((a, b) => b.name.localeCompare(a.name))],
        };
      }

    case ORDER_BY_WEIGHT:
      const sortedWeight = [...state.dogs].sort(function (a, b) {
        const weightA = a.weight === null ? Infinity : parseFloat(a.weight);
        const weightB = b.weight === null ? Infinity : parseFloat(b.weight);
        return action.payload === "ascendente"
          ? weightA - weightB
          : weightB - weightA;
      });
      return {
        ...state,
        dogs: sortedWeight,
      };

    case FILTER_ORIGIN:
      let filterXorigin;

      if (action.payload === "Opciones") {
        filterXorigin = state.allDogs;
      }

      if (action.payload === "Creados") {
        filterXorigin = state.allDogs.filter(
          (dogs) => typeof dogs.id === "string"
        );
      }
      if (action.payload === "Api") {
        filterXorigin = state.allDogs.filter(
          (dogs) => typeof dogs.id === "number"
        );
      }

      return {
        ...state,
        dogs: filterXorigin,
        tempDogs: [...filterXorigin],
      };

    default:
      return state;
  }
};

export default rootReducer;
