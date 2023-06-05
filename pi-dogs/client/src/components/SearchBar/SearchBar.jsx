import { useState } from "react";
import { getDogsByName } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import buscar from "../../contenidos/huella.png";
import s from "./SearchBar.module.css";

export default function SearchBar() {
    let [name, setName] = useState("");
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    }

function handleSubmit(event) {
    event.preventDefault();
    dispatch(getDogsByName(name));
    setName("");
}

return(
    <div className={s.containerSearch}>
        <input
            type="search"
            placeholder=" E.g 'Bullmastiff'"
            onChange={(event) => handleInputChange(event)}
            value={name}
            />
        <button 
            type="submit"
            onClick={(event) => handleSubmit(event)} >
                <div className={s.buscar}>
                <img src={buscar} alt="search" />
                </div>
            </button>
    </div>
)
}