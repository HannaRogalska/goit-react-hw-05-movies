import css from './Navigation.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Loader } from '../../components/Loader/Loader';

export default function Navigation() {
  return (
    <div className={css.Navigation}>
      <nav className={css.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? `${css.active}` : undefined)}
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? `${css.active}` : undefined)}
        >
          Movies
        </NavLink>
      </nav>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
