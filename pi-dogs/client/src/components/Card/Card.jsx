import React from "react";
import styled from "./Card.module.css";
import { NavLink } from "react-router-dom";

const Card = ({ dog }) => {
  return (
    <div className={styled.container}>
      <div className={styled.card}>
        <img className={styled.image} src={dog?.image} alt="img-dog" />
        <div className={styled.name}>
          <h2>{dog?.name}</h2>
        </div>
        <div className={styled.datos}>
          <h4 className={styled.tit}>Temperamentos :</h4>
          <h4>{dog?.temperament}</h4>
          <h4 className={styled.tit}>Peso :</h4>
          <h4 className={styled.peso}>{`${dog?.weight} kg`}</h4>
          <NavLink className={styled.nav} to={`/dogs/${dog?.id}`}>
            <button className={styled.button}>Quiero saber más</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Card;
