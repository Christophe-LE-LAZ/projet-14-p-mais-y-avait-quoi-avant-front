import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { clearCreateMemoryState } from '../../store/createMemoryReducer';

export default function Layout() {
  const dispatch = useAppDispatch();

  // Effacer le state de createMemory lorsqu'on change de page
  const location = useLocation();
  useEffect(() => {
    dispatch(clearCreateMemoryState());
  }, [location]);

  // Remonter tout en haut de la page lorsqu'on change de page
  useEffect(() => {
    window.scroll(0, 0);
  }, [location]);

  return (
    <div className="relative m-auto w-auto max-w-6xl">
      <Header />
      <div className="relative pt-40 pb-16 sm:pt-0 sm:pb-0">
        <main className="shadow-lg mt-5 pb-2 sm:mt-10">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
