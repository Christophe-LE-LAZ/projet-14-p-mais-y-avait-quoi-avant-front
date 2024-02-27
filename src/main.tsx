import React from 'react';
import ReactDOM from 'react-dom/client';

import Layout from './components/Layout/Layout';
import NotFound from './components/NotFound/NotFound';
import Disclaimer from './components/Disclaimer/Disclaimer';
import Register from './components/Register/Register';
import AboutUs from './components/AboutUs/AboutUs';
import Contact from './components/Contact/Contact';
import Contributions from './components/Contributions/Contributions';
import Home from './components/Home/Home';
import FAQ from './components/FAQ/FAQ';
import Memories from './components/Memories/Memories';
import Memory from './components/Memory/Memory';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Share from './components/Share/Share';
import Update from './components/Update/Update';
import PrivateRoute from './PrivateRoute';
import Locations from './components/Locations/Locations';

// Store redux
import { Provider } from 'react-redux';
import store from './store';

// Styles
import 'tailwindcss/tailwind.css';
import './styles/index.scss';

// Router
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/memories/:id" element={<Memory />} />
        <Route path="/memories/:id/edit" element={<Update />} />
        <Route
          path="/share"
          element={
            <PrivateRoute>
              <Share />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/contributions" element={<Contributions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/locations" element={<Locations />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
