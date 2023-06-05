import React from "react";
import style from "./Pagination.module.css";

function Pagination({ dogsPerPage, dogs, currentPage, paginado }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.paginado}>
      {pageNumbers.map((number) => (
        <div
          key={number}
          className={`${style.number} ${
            currentPage === number ? style.active : ""
          }`}
        >
          <b 
        
          className={style.link} href="#" onClick={() => paginado(number)}>
            {number}
          </b>
        </div>
      ))}
    </div>
  );
}

export default Pagination;
