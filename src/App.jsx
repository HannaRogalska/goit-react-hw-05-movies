import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import Cast from './pages/MovieDetailsPage/Cast/Cast';
import Reviews from './pages/MovieDetailsPage/Reviews/Reviews';
import NotFound from './pages/NotFound/NotFound';

const Navigation = lazy(() => import('./components/Navigation/Navigation'));
const Home = lazy(() => import('./pages/HomePage/HomePage'));
const Movies = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetails = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage')
);

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
