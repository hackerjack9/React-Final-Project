
import MovieDetails from './components/MovieDetails';
import MovieApp from './components/MovieApp';
import Nav from './components/Nav';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <Routes>
       <Route path="/Nav" element={<Nav />} />
       <Route path= "/" element={<HomePage />} />
       <Route path="/movies" element={<MovieApp />} />
      </Routes>
    </Router>
  )
}

export default App;
