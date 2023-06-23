import css from './DetailsPage.module.css';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import { getMovieDetails, getImg } from '../../services/moviesApi';
import { Loader } from '../../components/Loader/Loader';

export default function MovieDetails() {
  const location = useLocation();
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState('');
  const [img, setImg] = useState('');
  const { movieId } = useParams();

  useEffect(() => {
    getMovieDetails(movieId).then(data => {
      setMovie(data.data);
      setGenres(() =>
        data.data.genres
          .map(genre => {
            return genre.name;
          })
          .join(', ')
      );
      setImg(getImg(data.data.poster_path, 'w342'));
    });
  }, [movieId]);

  return (
    <div className={css.details}>
      <Link to={location?.state?.from ?? '/'} className={css.link}>
        <button type="button" className={css.backBtn}>
          Go back
        </button>
      </Link>

      <div className={css.wrap}>
        <img src={img} alt={movie.original_title} />
        <div className={css.info}>
          <h1>{movie.original_title}</h1>
          <p>Score: {movie.vote_average}</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <p>{genres}</p>
        </div>
      </div>

      <div className={css.additionalInfo}>
        <h2>Additional Info</h2>
        <ul className={css.list}>
          <li className={css.item}>
            <Link
              to="cast"
              state={{ from: location?.state?.from ?? '/' }}
              className={css.link}
            >
              Cast
            </Link>
          </li>

          <li className={css.item}>
            <Link
              to="reviews"
              state={{ from: location?.state?.from ?? '/' }}
              className={css.link}
            >
              Reviews
            </Link>
          </li>
        </ul>

        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
