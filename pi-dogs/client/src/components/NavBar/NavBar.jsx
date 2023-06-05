import { Link } from "react-router-dom"
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import { getDogs } from "../../Redux/actions";

const NavBar = () => {
    const dispatch = useDispatch();
    const pathSearch= "/home";
    const path = window.location.pathname;

    const handleRefresh = (e) => {
        dispatch(getDogs(e));
    }

    return(
        <nav>
        <div className={style.mainContainer}>
            <Link to="/home" className={style.menu}>Home</Link>
            <Link to="/create" className={style.menu}>Create a new Dog</Link>
            <button className={style.buttonCont} onClick={e => handleRefresh(e)}><b className={style.refresh}>Refresh</b></button>
         
            {path === pathSearch ? <SearchBar /> : null}
        </div>
        </nav>
    )
}

export default NavBar;