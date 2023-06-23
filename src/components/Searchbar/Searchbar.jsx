import css from './Searchbar.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

export function Searchbar({ onSubmit }) {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query'));

  function formSubmit(e) {
    e.preventDefault();
    onSubmit(searchQuery);
  }

  return (
    <form className={css.form} onSubmit={formSubmit}>
      <label>
        <input
          type="text"
          onChange={e => setSearchQuery(e.target.value)}
          value={searchQuery === null ? '' : searchQuery}
        />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </label>
    </form>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
