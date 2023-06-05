import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import style from "./Detail.module.css";
import { useEffect } from "react";
import { getDetailDogs } from "../../Redux/actions";

const Detail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const dogsDetail = useSelector((state) => state.dogsById);
  const navigate = useNavigate();

  let doguis = dogsDetail;

  useEffect(() => {
    return dispatch(getDetailDogs(params.id));
  }, [dispatch, params.id]);

  return (
    <>
      <div className={style.contenedorGeneral}>
        <div className={style.encabezado}>
          <h1 className={style.name}>{doguis.name}</h1>
          <div className={style.info}>
            <img className={style.image} src={doguis.image} alt="dog-img" />
            <div className={style.bloque1}>
              <h3 className={style.titulos}> Temperamentos </h3>
              <h4 className={style.subtitulo}>{doguis.temperament}</h4>
              <h3 className={style.titulos}>Altura</h3>
              <h4 className={style.subtitulo}>{`${doguis?.height} cm`}</h4>
              <h3 className={style.titulos}>Peso</h3>
              <h4>{`${doguis?.weight} kg`}</h4>
              <h3 className={style.subtitulo}>ID: {doguis.id}</h3>
            </div>
            <div className={style.bloque2}>
              <h3 className={style.titulos}>Años de vida</h3>
              <h4 className={style.subtitulo}>{doguis.life_span}</h4>
            </div>
          </div>
          <div className={style.btnContenedor}>
          <button className={style.back} onClick={() => navigate("/home")}>
            <b className={style.btn}>Regresar</b>
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
