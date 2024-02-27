import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { deleteUser } from '../../store/userReducer';

export default function Profile() {
  const { firstname, email, lastname, id } = useAppSelector((state) => state.user);
  
  const dispatch = useAppDispatch();

  const [showConfirmation, setShowConfirmation] = useState(false);

  // gestion de la suppression
  const handleClickDelete = () => {
    setShowConfirmation(true);
  }

  // confirmer la suppression
  const handleConfirmDelete = () => {
    setShowConfirmation(false);
    dispatch(deleteUser());
  }

  // annuler la suppression
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  }

  // modifier le profil
  

  return (
    <div className="mt-10 p-5 border rounded-lg max-w-2xl m-auto">
      <div className="avatar flex flex-col my-4 items-center">
        <div className="w-24 rounded-full mb-3">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
        <button className="text-sm bg-gray-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ">
          Modifier
        </button>
        <h1 className="py-8">Bienvenue sur votre profil, {firstname}.</h1>
      </div>

      <div className="flex justify-between border-t-2 border-b border-grey p-5">
        <div className="">
          <strong>Nom</strong> : {lastname}
        </div>
        <div>
          <button className="text-sm bg-gray-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
            Modifier
          </button>
        </div>
      </div>
      <div className="flex justify-between border-y border-grey p-5">
        <div className="">
          <strong>Prénom</strong> : {firstname}
        </div>
        <div>
          <button className="text-sm bg-gray-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ">
            Modifier
          </button>
        </div>
      </div>
      <div className="flex justify-between border-y border-grey p-5">
        <div className="">
          <strong>Email</strong> : {email}
        </div>
        <div>
          <button className="text-sm bg-gray-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
            Modifier
          </button>
        </div>
      </div>
      <div className="flex justify-between border-t border-b-2 border-grey p-5">
        <div className="">
          <strong>Mot de passe</strong> : *****
        </div>
        <div>
          <button className="text-sm bg-gray-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
            Modifier
          </button>
        </div>
      </div>
      <div className="flex justify-between border-t border-b-2 border-grey p-5">
        <div className="">
          <strong>Supprimer mon compte</strong>
        </div>
        <div>
          <button
            className="text-sm bg-gray-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            onClick={handleClickDelete}
          >
            Supprimer
          </button>
        </div>
      </div>
      
      {showConfirmation && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-70">
          <div className="bg-white p-8 rounded-lg">
            <p className="mb-4">Etes-vous sûr de vouloir supprimer votre compte ?</p>
            <div className="flex justify-end">
              <button
                className="mr-4 text-sm bg-gray-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                onClick={handleCancelDelete}
              >
                Annuler
              </button>
              <button
                className="text-sm bg-gray-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                onClick={handleConfirmDelete}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}