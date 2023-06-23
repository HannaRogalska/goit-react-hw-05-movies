import css from './Cast.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieCast, getImg } from 'services/moviesApi';
import defaultAvatar from '../../../images/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png';

export default function Cast() {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    getMovieCast(movieId).then(data => setCast(data.data.cast));
  }, [movieId]);

  return (
    <ul className={css.list}>
      {cast.map(actor => {
        const image = getImg(actor.profile_path, 'w154');
        return (
          <li className={css.item} key={actor.id}>
            <img
              src={actor.profile_path ? image : defaultAvatar}
              alt={actor.name}
            />
            <p>Character in this movie: {actor.character}</p>
          </li>
        );
      })}
    </ul>
  );
}
