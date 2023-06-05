import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../../Redux/actions";
import style from "./Form.module.css"
import axios from "axios";
import { NavLink } from "react-router-dom";

const validate = (input) => {
    let errors = {};
    if (input.temperament.length === 0) {
      errors.temperament = "select 1 or more temperaments";
    }
  
    if (!input.name || !/^[A-Z]+[A-Za-z\s]+$/g.test(input.name)) {
      errors.name = "First letter in Uppercase, Only Letters";
    }
    if (!input.race.trim() || !/^[A-Za-z\s]+$/g.test(input.race)) {
      errors.race = "Only letters";
    }
    // --------------------------------------------------
    if (!input.height_min || !/^[1-9]\d*(\.\d+)?$/.test(input.height_min)) {
      errors.height_min = "Min only admits integers";
    }
    if (!input.height_max || !/^[1-9]\d*(\.\d+)?$/.test(input.height_max)) {
      errors.height_max = "Max only admits integers";
    }
  
    if (input.height_max <= input.height_min) {
      errors.height_max = "Max cannot be less than or equal to Min";
    }
    // --------------------------------------------------
  
    if (!input.weight_min || !/^[1-9]\d*(\.\d+)?$/.test(input.weight_min)) {
      errors.weight_min = "Min only admits integers";
    }
    if (!input.weight_max || !/^[1-9]\d*(\.\d+)?$/.test(input.weight_max)) {
      errors.weight_max = "Max only admits integers";
    }
  
    if (input.weight_max <= input.weight_min) {
      errors.weight_max = "Max cannot be less than or equal to Min";
    }
    // --------------------------------------------------
  
    if (!input.life_span_min || !/^[1-9]\d*(\.\d+)?$/.test(input.life_span_min)) {
      errors.life_span_min = "Min only admits integers";
    }
    if (!input.life_span_max || !/^[1-9]\d*(\.\d+)?$/.test(input.life_span_max)) {
      errors.life_span_max = "Max only admits integers";
    }
  
    if (input.life_span_max <= input.life_span_min) {
      errors.life_span_max = "Max cannot be less than or equal to Min";
    }
  
    return errors;
  };

const Create = (props) => {
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments)

    const [input, setInput] = useState({
        name: "",
        race: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span_min: "",
        life_span_max: "",
        temperament: [],
    });
    const [errors, setErrors] = useState({});
    const [selectedTemperaments, setSelectedTemperaments] = useState([]);

    const handlerChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setInput({
            ...input,
            [property]: value,
        });
        setErrors(
            validate({
                ...input,
                [property]: value,
            })
        );
    };

    //---------------Temperament---------------------

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    const SelectTemperaments = (event) => {
        const value = event.target.value;

        setInput({
            ...input,
            temperament: [...input.temperament, value],
         });

        setSelectedTemperaments([
            ...selectedTemperaments,
            temperaments.find((elem) => elem.id === parseInt(value)),
        ]);
    };

    const deleteTemperament = (temp) => {
        setInput({
            ...input,
            temperament: input.temperament.filter((elem) => parseInt(elem) !== temp)
        });

        setSelectedTemperaments(
            selectedTemperaments.filter((elem) => elem.id !== temp)
        );
    };
//---------------------------------------------------------


const handlerSubmit = (event) => {
    event.preventDefault();
    // compruebo que esté todo antes de enviar
    if (
      Object.keys(errors).length === 0 &&
      input.name !== "" &&
      input.race !== "" &&
      input.height_min !== "" &&
      input.height_max !== "" &&
      input.weight_min !== "" &&
      input.weight_max !== "" &&
      input.life_span_min !== "" &&
      input.life_span_max !== "" &&
      input.temperament.length !== 0
    ) {
      axios
        .post("http://localhost:3001/dogs", input)
        .then((res) => alert("successfully created Dog!"))
        .catch((err) => console.error(err));

      window.location.reload();
    } else {
      alert("complete without errors");
    }
  };
    return (
        <div className={style.form}>
         {!input}
      <NavLink to="/home">
        <button className={style.prev}> 🢀 Home</button>
      </NavLink>
      <div className={style.contentForm}>
        <form onSubmit={(event) => handlerSubmit(event)} id="create-dog">
          <h2>Create your Pet!</h2>
          {/*-------------------------------------------------------------*/}
          <div className={style.contentSelect}>
            <div>
              <label htmlFor="">One or more temperaments:</label>
            </div>
            <select
              name="temperaments"
              form="create-dog"
              defaultValue="none"
              className={style.select}
              onChange={(e) => SelectTemperaments(e)}
            >
              <option hidden defaultValue="options" value="none">
                options
              </option>
              {temperaments?.map((temp) => (
                <option value={temp.id} key={temp.name}>
                  {temp.name}
                </option>
              ))}
            </select>
            {errors.temperament && (
              <p className={style.error}>{errors.temperament}</p>
            )}
            <ul className={style.uls}>
              {selectedTemperaments?.map((elem, i) => {
                return (
                  <h6 key={i} className={style.temps}>
                    <button
                      className={style.deletebutton}
                      key={i}
                      id={elem.id}
                      type="button"
                      onClick={() => deleteTemperament(elem.id)}
                    >
                      X
                    </button>
                    {elem.name}
                  </h6>
                );
              })}
            </ul>
          </div>
          {/*---------------------------------------------------------------*/}
          <div className={style.divNames}>
            <div className={style.label}>
              <label htmlFor="name"> Name </label>
            </div>
            <div>
              <input
                autoComplete="off"
                type="text"
                name="name"
                value={input.name}
                id="name"
                placeholder="Firulais"
                className={style.inputNames}
                onChange={handlerChange}
              />
            </div>
            {errors.name && <p className={style.error}>{errors.name}</p>}
            {/*--------------------------------------------------------------*/}
            <div>
              <div>
                <label htmlFor="name">Name race</label>
              </div>
              <input
                autoComplete="off"
                type="text"
                name="race"
                value={input.race}
                id="race"
                placeholder="Toy"
                className={style.inputNames}
                onChange={handlerChange}
              />
              {errors.race && <p className={style.error}>{errors.race}</p>}
            </div>
          </div>
          {/*--------------------------------------------------------------*/}
          <div>
            <h5 className={style.titles}>- Heights -</h5>
            <label htmlFor="height_min"> Min </label>
            <input
              autoComplete="off"
              type="text"
              name="height_min"
              value={input.height_min}
              id="height_min"
              placeholder="  50"
              className={style.input}
              onChange={handlerChange}
            />
            <label className={style.label2} htmlFor="">
              {" "}
              Ft - | -{" "}
            </label>
            {/*--------------------------------------------------------------*/}
            <label htmlFor="height_max"> Max </label>
            <input
              autoComplete="off"
              type="text"
              name="height_max"
              value={input.height_max}
              id="height_max"
              placeholder="  90"
              className={style.input}
              onChange={handlerChange}
            />
            <label className={style.label2} htmlFor="">
              {" "}
              Ft
            </label>
            {errors.height_max && (
              <p className={style.error}>{errors.height_max}</p>
            )}
          </div>
          {/*--------------------------------------------------------------- */}
          <div>
            <h5 className={style.titles}>- Weights -</h5>
            <label htmlFor="weight_min"> Min </label>
            <input
              autoComplete="off"
              type="text"
              name="weight_min"
              value={input.weight_min}
              id="weight_min"
              placeholder="  5"
              className={style.input}
              onChange={handlerChange}
            />
            <label className={style.label2} htmlFor="">
              {" "}
              Kg - | -
            </label>
            {/*------------------------------------------------------------*/}
            <label htmlFor="weight_max"> Max </label>
            <input
              autoComplete="off"
              type="text"
              name="weight_max"
              value={input.weight_max}
              id="weight_max"
              placeholder="  9"
              className={style.input}
              onChange={handlerChange}
            />
            <label className={style.label2} htmlFor="">
              {" "}
              Kg
            </label>
            {errors.weight_max && (
              <p className={style.error}>{errors.weight_max}</p>
            )}
          </div>
          {/*---------------------------------------------------------------*/}
          <div>
            <h5 className={style.titles}>- Average Life -</h5>
            <label htmlFor="life_span_min"> Min </label>
            <input
              autoComplete="off"
              type="text"
              name="life_span_min"
              value={input.life_span_min}
              id="life_span_min"
              placeholder="  10"
              className={style.input}
              onChange={handlerChange}
            />
            <label className={style.label2} htmlFor="">
              years - | -
            </label>
            {/*-------------------------------------------------------------- */}
            <label htmlFor="life_span_max"> Max </label>
            <input
              autoComplete="off"
              type="text"
              name="life_span_max"
              value={input.life_span_max}
              id="life_span_max"
              placeholder="  15"
              className={style.input}
              onChange={handlerChange}
            />
            <label className={style.label2} htmlFor="">
              years
            </label>
            {errors.life_span_max && (
              <p className={style.error}>{errors.life_span_max}</p>
            )}
          </div>
          {/*--------------------------------------------------------------- */}
          <div className={style.divButtonCreate}>
            <button className={style.buttonCreate} hidden={true} type="submit">
              Create Dog
            </button>
          </div>
        </form>
      </div>
        </div>
    )
}


export default Create;