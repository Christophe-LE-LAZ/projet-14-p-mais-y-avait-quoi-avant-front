import { ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFieldStateCred, login } from '../../store/userReducer';
import { TInputNameCred } from '../../types/inputName';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  // Lecture des states du User reducer
  const { loading, error, registered, logged, deleted, message } = useAppSelector(
    (state) => state.user
  );
  const { username, password } = useAppSelector(
    (state) => state.user.credentials
  );

  const dispatch = useAppDispatch();

  const handleChangeCred = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value as string;
    const inputName = e.target.name as TInputNameCred;
    dispatch(changeFieldStateCred({ inputValue, inputName }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login());
  };

  // Redirection vers la page d'accueil si la connexion a réussi
  const navigate = useNavigate();
  useEffect(() => {
    if (logged) {
    navigate("/");
    }
  }, [logged])

  return (
      <div className="flex flex-col items-center m-10 gap-5 sm:m-20">
        {/* Affichage d'un message si l'utilisateur vient juste de créer son compte */}
        {registered && (
          <div role="alert" className="alert alert-success text-sm max-w-xs">
            <span>{message}</span>
          </div>
        )}

        {/* Affichage d'un message si l'utilisateur vient juste de supprimer son compte */}
        {deleted && (
          <div role="alert" className="alert alert-success text-sm max-w-xs">
            <span>{message}</span>
          </div>
        )}

        <h2 className="text-xl">Connectez-vous</h2>
        <form onSubmit={handleSubmit}>
          {/* Champ Email (username) */}
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
              onChange={handleChangeCred}
              value={username}
              name="username"
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
              placeholder="Entrez votre mot de passe"
              className="grow"
              onChange={handleChangeCred}
              name="password"
              value={password}
            />
          </label>
          <div className="flex justify-center mt-6">
            {/* Bouton de soumission du formulaire */}
            <button type="submit" className="btn">
              Soumettre
            </button>
            {/* Affichage d'un loader pendant le loading */}
            {loading && (
              <span className="loading loading-spinner loading-md ml-5"></span>
            )}
          </div>
        </form>
        {/* Affichage d'un message d'erreur */}
        {error && (
          <div role="alert" className="alert alert-error max-w-xs">
            <span>{error}</span>
          </div>
        )}

        <div className="flex flex-col items-center">
          <p className="text-sm mb-2">Pas encore de compte sur Auparavant ?</p>
          <Link to="/register" className="link link-primary text-sm">
            {' '}
            Inscrivez-vous
          </Link>
        </div>
      </div>
      );
}
