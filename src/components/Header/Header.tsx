import React from 'react';
import Navbar from '../Navbar/Navbar';
import Logo from '../../assets/Logo.png';
import Title from '../../assets/Title.png'
import Avatar from '../../assets/Avatar.png';
import './Header.scss';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { logout } from '../../store/userReducer';

export default function Header() {
  const firstname = useAppSelector((state) => state.user.firstname);
  const logged = useAppSelector((state) => state.user.logged);

  const dispatch = useAppDispatch();

  // Gestion du click sur Déconnexion
  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <header className="fixed bg-base-100 z-50 sm:static">
      {/* Mobile : logo à gauche - Desktop : logo centré */}
      <div className="flex justify-start lg:justify-center">
        {/* Logo avec lien vers la page d'accueil */}
        <Link to="/">
          <img alt="Logo" src={Logo} className="ml-10 w-20 sm:w-28 lg:w-40"/>
        </Link>
        <Link to="/">
          <img alt="Title" src={Title} className="hidden mt-8 w-48 sm:flex lg:w-80" />
        </Link>
        {/* Liens de connexion / inscription si utilisateur non connecté */}
        {!logged && (
          <div className="absolute right-10 top-7">
            <Link to="/register" className="link link-hover">
              S'inscrire
            </Link>{' '}
            |{' '}
            <Link to="/login" className="link link-hover">
              Se connecter
            </Link>
          </div>
        )}
        {/* Message si utilisateur connecté */}
        {logged && (
          <div className="absolute right-28 top-7">Bonjour {firstname}</div>
        )}
        {/* Avatar d'utilisateur connecté avec menu déroulant */}
        {logged && (
          <div className="dropdown dropdown-end absolute right-10 top-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="rounded-full">
                <img alt="Avatar" src={Avatar} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile">Mon profil</Link>
              </li>
              <li>
                <Link to="/contributions">Mes contributions</Link>
              </li>
              <li>
                <Link to="" onClick={handleClick}>
                  Déconnexion
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <Navbar />
    </header>
  );
}
