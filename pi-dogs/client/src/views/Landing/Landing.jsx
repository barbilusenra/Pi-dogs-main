import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import video from "../../contenidos/animals.mp4";

const Landing = () => {
    return (
        <div className={styles.contenedor}>
            <h1>Bienvenidos a mi Api</h1>
            <Link to="/home">
                <button className={styles.boton}>COMENZAR</button>
            </Link>
            <video src={video} autoplay="true" muted="true" loop="true" type="video/mp4" />
        </div>
    )
};

export default Landing;