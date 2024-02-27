import { Navigate } from 'react-router-dom';
import { useAppSelector } from './hooks/redux';

// Création d'un wrapper permettant de rediriger l'utilisateur
// vers la page de connexion s'il n'est pas connecté

interface PageProps {
  children: React.ReactNode;
}

export default function Unlogged_to_login({ children }: PageProps) {
  const isLogged = useAppSelector((state) => state.user.logged);

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  return children as JSX.Element;
}
