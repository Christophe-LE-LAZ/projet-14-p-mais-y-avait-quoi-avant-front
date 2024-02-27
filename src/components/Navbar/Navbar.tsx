import './Navbar.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import Home from '../../assets/Home.png';
import See from '../../assets/See.png';
import Share from '../../assets/Share.png';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setInput, setSearchedInput } from '../../store/filterReducer';

export default function Navbar() {
  // Récupération des valeurs du state
  const { input, searchedInput } = useAppSelector((state) => state.filter);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInput(e.target.value));
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(setSearchedInput(input));
      navigate(`/memories`);
    }
  };

  return (
    <nav className="flex justify-center">
      {/* Navbar version Desktop */}
      <div className="navbar justify-evenly sm:max-w-5xl">
        <NavLink
          className="h-12 rounded-lg p-3 hover:bg-base-200 hidden sm:flex"
          to="/"
        >
          Accueil
        </NavLink>
        <NavLink
          className="h-12 rounded-lg p-3 hover:bg-base-200 hidden sm:flex"
          to="/memories"
        >
          <p>Voir les souvenirs</p>
        </NavLink>
        <NavLink
          className="h-12 rounded-lg p-3 hover:bg-base-200 hidden sm:flex"
          to="/share"
        >
          Partager un souvenir
        </NavLink>
        {/* Barre de recherche */}

        <label className="input input-bordered flex items-center gap-2 w-screen sm:w-40 lg:w-auto">
          <input
            type="text"
            className="grow"
            placeholder="Rechercher..."
            value={input}
            onChange={handleChangeSearch}
            onKeyDown={handleSearch}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      {/* Navbar version Mobile  */}
      <div className="btm-nav sm:hidden">
        <NavLink to="/">
          <img alt="Home-logo" src={Home} className="w-6" />
          <span className="btm-nav-label">Accueil</span>
        </NavLink>
        <NavLink to="/memories">
          <img alt="See-logo" src={See} className="w-6" />
          <span className="btm-nav-label">Voir</span>
        </NavLink>
        <NavLink to="/share">
          <img alt="Share-logo" src={Share} className="w-6" />
          <span className="btm-nav-label">Partager</span>
        </NavLink>
      </div>
    </nav>
  );
}
