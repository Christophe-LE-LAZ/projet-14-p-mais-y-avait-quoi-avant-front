import { ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  changeFieldStateRegister,
  register,
  passwordCheck,
} from '../../store/userReducer';
import { TInputNameRegister } from '../../types/inputName';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  // Lecture des states du User reducer
  const {
    firstname,
    lastname,
    email,
    password,
    password_check,
    loading,
    error,
    registered
  } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const handlePasswordCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value as string;
    dispatch(passwordCheck(inputValue));
  };

  const handleBlurRegister = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value as string;
    const inputName = e.target.name as TInputNameRegister;
    dispatch(changeFieldStateRegister({ inputValue, inputName }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register());
  };

  // Redirection vers la page de connexion si l'inscription a réussi
  const navigate = useNavigate();
    useEffect(() => {
      if (registered) {
      navigate("/login");
      }
    }, [registered])
  

  return (
    <div className="flex flex-col items-center m-10 gap-5 sm:m-10">
      <h2 className="text-xl">Inscrivez-vous</h2>
      <form onSubmit={handleSubmit}>
        {/* Champ Prénom  */}
        <label className="input input-bordered flex items-center gap-2 mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Entrez votre prénom"
            onBlur={handleBlurRegister}
            defaultValue={firstname}
            name="firstname"
          />
        </label>

        {/* Champ Nom de famille  */}
        <label className="input input-bordered flex items-center gap-2 mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Entrez votre nom"
            onBlur={handleBlurRegister}
            defaultValue={lastname}
            name="lastname"
          />
        </label>

        {/* Champ Email */}
        <label className="input input-bordered flex items-center gap-2 mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            placeholder="Entrez votre email"
            className="grow"
            onBlur={handleBlurRegister}
            defaultValue={email}
            name="email"
          />
        </label>

        {/* Champ Password */}
        <label className="input input-bordered flex items-center gap-2 mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            placeholder="Créez votre mot de passe"
            className="grow"
            onBlur={handleBlurRegister}
            defaultValue={password}
            name="password"
          />
        </label>

        {/* Champ Password vérification */}
        <label className="input input-bordered flex items-center gap-2 mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            placeholder="Vérifiez votre mot de passe"
            className="grow"
            onChange={handleBlurRegister}
            onBlur={handlePasswordCheck}
            defaultValue={password_check}
            name="password_check"
          />
        </label>
        <div className="flex justify-center mt-6">
          {/* Bouton de soumission du formulaire */}
          {error && (
            <button type="submit" className="btn btn-disabled">
              Soumettre
            </button>
          )}
          {!error && (
            <button type="submit" className="btn">
              Soumettre
            </button>
          )}

          {/* Affichage d'un loader pendant le loading */}
          {loading && (
            <span className="loading loading-spinner loading-md ml-5"></span>
          )}
        </div>
      </form>
      {/* Affichage d'un message d'erreur */}
      {error && (
        <div role="alert" className="alert alert-error text-sm max-w-xs">
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-col items-center">
        <p className="text-sm mb-2">Déjà inscrit sur Auparavant ?</p>
        <Link to="/login" className="link link-primary text-sm">
          {' '}
          Connectez-vous
        </Link>
      </div>
    </div>
  );
}
