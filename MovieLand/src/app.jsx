import { useState, useEffect } from 'preact/hooks'
import searchLogo from './assets/search.svg'
import MovieCard from './movieCard'
import './app.css'

const API_URL = 'https://www.omdbapi.com?apikey=139b73a2'

export function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState();

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search || []); // handle when no results
  }

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input 
          type="text" 
          placeholder='Search for movies' 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === "Enter")
            {
              searchMovies(searchTerm);
            }
          }}
        />

        <img 
          src={searchLogo} 
          alt="search"
          onClick={() => searchMovies(searchTerm)} 
        />
      </div>

      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}
