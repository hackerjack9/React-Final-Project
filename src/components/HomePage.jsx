import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/HomePage.css'; 
import homeIMG from '../styles/assets/movieAudience.jpg'; 
import filmRoleIMG from '../styles/assets/filmStrip.jpg'; 
import audienceLogo from '../styles/assets/logo-png.png'; 

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/movies?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <main className="home-page">
       <img className="App__logo"src={audienceLogo} alt="" />
       <img className="home-page__img2" src={filmRoleIMG} alt="" />
      <h1> Welcome to Show Stopper</h1>
      <p>Find your favorite movies instantly</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a movie title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <img className="home-page__img" src={homeIMG} alt="" />
    </main>
  );
};

export default HomePage;
