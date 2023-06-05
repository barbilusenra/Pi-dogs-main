import './App.css';
import {Route, Routes, useLocation} from "react-router-dom";
import { Home, Landing, Detail, Create } from './views';
import NavBar from './components/NavBar/NavBar';


function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && location.pathname !== "/create" && <NavBar />}
    
      <Routes>
        <Route exact path="/" element={ <Landing /> } />
        <Route exact path="/home" element= { <Home /> } />
        <Route exact path="/dogs/:id" element = { <Detail /> } />
      <Route exact path="/create" element= { <Create /> } />
      </Routes>
    </div>
  );
}

export default App;
