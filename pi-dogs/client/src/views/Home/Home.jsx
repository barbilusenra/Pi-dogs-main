import React, { useEffect, useState } from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import {
  filterTemperaments,
  getDogs,
  getTemperaments,
  orderAlphabetic,
  orderByWeight,
  filterOrigin,
} from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./Home.module.css";
import load from "../../contenidos/load.gif";


export default function Home() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);

  // Paginado
  const [currentePage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexofLastCard = currentePage * 8; //8
  const indexofFirstCard = indexofLastCard - dogsPerPage;
  const currentCards = dogs.slice(indexofFirstCard, indexofLastCard);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // orden alfabetico
  const orderAlph = (event) => {
    dispatch(orderAlphabetic(event.target.value));
  };
 
  // orden por peso 
const orderWeight = (event) => {
  dispatch(orderByWeight(event.target.value));
};

  useEffect(() => {    
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div>
      <div className={styles.filterContainer}>
      <div className={styles.filter}>
        <label>Temperamentos:</label>
        <select onChange={(e) => dispatch(filterTemperaments(e.target.value))}>
          <option value="">Opciones</option>
          {temperaments.map((temp) => (
            <option value={temp.id} key={temp.name}>
              {temp.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.filter}>
          <label>Origen:</label>
          <select onChange={(e) => dispatch(filterOrigin(e.target.value))}>
            {["Opciones", "Api", "Creados"].map((e, i) => (
              <option value={e} key={i}>
                {e}
              </option>
            ))}
          </select>
        </div>
      <div className={styles.filter}>
        <label>Ordenar:</label>
          <select onChange={orderAlph} defaultValue="">
            <option value="" disabled>
              A-Z / Z-A
            </option>
            <option value="Ascendente">Ascendente</option>
            <option value="Descendente">Descendente</option>
          </select>
        </div>
        <div className={styles.filter}>
          <label>Peso:</label>
          <select className={styles.filter} onChange={orderWeight} defaultValue="">
            <option value="" disabled>
              Ordenar por
            </option>
            <option value="ascendente">Menor Peso</option>
            <option value="descendente">Mayor Peso</option>
          </select>
        </div>
        </div>
      {!dogs.length ? (
        <div>
          {" "}
          <img className={styles.image} src={load} alt="loading" />{" "}
          <h2 className={styles.loading}>Loading...</h2>{" "}
        </div>
      ) : (
        <div>
          <CardsContainer dogs={currentCards} />
          <Pagination
            dogsPerPage={dogsPerPage}
            dogs={dogs.length}
            currentPage={currentePage}
            paginado={paginado}
          />
        </div>
      )}
    </div>
  );
}
