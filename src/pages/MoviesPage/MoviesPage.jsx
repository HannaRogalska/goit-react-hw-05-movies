import { useState, useEffect } from 'react';
import css from './MoviesPage.module.css';
import Notiflix from 'notiflix';
import { searchMovies } from 'services/moviesApi';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { Searchbar } from '../../components/Searchbar/Searchbar';

export default function Movies() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  function onFormSubmit(query) {
    setSearchParams({ query: query });
  }

  useEffect(() => {
    const query = searchParams.get('query');

    if (query === null) {
      return;
    }

    if (query === '') {
      // toast.info('Please enter the name of the movie to search');
      Notiflix.Notify.warning('Please enter the name of the movie to search');
      return;
    }
    searchMovies(query).then(data => {
      if (data.data.total_results === 0) {
        Notiflix.Notify.failure(`Oops! No movie found containing ${query}`);
        // toast.error(`Oops! No movie found containing ${query}`);
        return;
      }
      setMovies(data.data.results);
    });
  }, [searchParams]);

  useEffect(() => {
    return setMovies([]);
  }, []);

  return (
    <div className={css.movies}>
      <Searchbar onSubmit={onFormSubmit} />
      {movies.length > 0 && (
        <div>
          <ul className={css.list}>
            {movies.map(movie => (
              <li key={movie.id}>
                <Link
                  className={css.link}
                  to={`/movies/${movie.id}`}
                  state={{ from: location }}
                >
                  {movie.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
