import Card from "../Card/Card";
import styles from "./CardsContainer.module.css";

function CardsContainer({ dogs }) {

    return(
        <div className={styles.cards}>
            {dogs?.map((dog) => (
               <Card
               key={dog.id}
               dog={dog}
               /> 
            ))}
        </div>
    )
}

export default CardsContainer;