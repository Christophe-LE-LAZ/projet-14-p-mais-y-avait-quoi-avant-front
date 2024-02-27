import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Delete from '../../assets/Delete.png';
import Edit from '../../assets/Edit.png';
import { deleteMemory } from '../../store/singleMemoryReducer';
import { useEffect, useState } from 'react';
import { clearMessage, setMessage } from '../../store/messageReducer';
import { fetchSingleMemory } from '../../store/singleMemoryReducer';
import Loader from '../Loader/Loader';

const Memory = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Récupération des souvenirs depuis l'API
  useEffect(() => {
    const memoryId = Number(id);
    dispatch(fetchSingleMemory(memoryId));
  }, []);

  // Récupération des valeurs du state
  const { memory, loading } = useAppSelector((state) => state.singleMemory);
  const userId = useAppSelector((state) => state.user.id);
  const { action_done, message } = useAppSelector((state) => state.message);

  const [showConfirmation, setShowConfirmation] = useState(false);

  // Convertir la date en objet Date
  const memoryDate = new Date(memory.picture_date);
  // Formater la date pour afficher sans les secondes
  const formattedDate = memoryDate.toLocaleString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  // affichage d'une demande de confirmation suite au click sur suppression
  const handleClickDelete = () => {
    setShowConfirmation(true);
  };

  // confirmer la suppression
  const handleConfirmDelete = () => {
    setShowConfirmation(false);
    const memoryID = memory.id;
    dispatch(deleteMemory(memoryID as number))
      .unwrap()
      .then(() => {
        navigate('/memories');
        dispatch(setMessage('Votre souvenir a bien été supprimé.'));
      });
  };

  // annuler la suppression
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (action_done) {
      setShowSuccess(true);
    }
  }, []);

  const handleOK = () => {
    setShowSuccess(false);
    dispatch(clearMessage());
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-between">
            <Link to="/memories" className="link ml-10">
              Retour à la liste des souvenirs
            </Link>
            <div className="flex mr-10 gap-4 ">
              {memory.user.id === userId && (
                <>
                  <Link to={`/memories/${memory.id}/edit`}>
                    <div className="btn btn-ghost btn-circle avatar">
                      <img
                        alt="edit"
                        src={Edit}
                        className="w-10 rounded-full"
                      />
                    </div>
                  </Link>
                  <div className="btn btn-ghost btn-circle avatar">
                    <img
                      alt="delete"
                      src={Delete}
                      className="w-10 rounded-full"
                      onClick={handleClickDelete}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="max-w-lg mx-auto">
            {/* Affichage d'un message si l'utilisateur vient juste de créer un souvenir */}
            {showSuccess && (
              <div className="flex justify-center">
                <div
                  role="alert"
                  className="flex alert alert-success text-sm max-w-sm justify-between my-5"
                >
                  <span>{message}</span>
                  <button
                    className="text-sm bg-white font-bold py-1 px-2 rounded"
                    onClick={handleOK}
                  >
                    OK
                  </button>
                </div>
              </div>
            )}

            {/* Titre */}
            <h1 className="text-center text-xl font-bold lg:text-2xl pt-5 pb-5">
              {memory.title}{' '}
            </h1>
            {/* Image */}
            <div className="mx-8">
              <img
                src={`https://admin.auparavant.fr/assets/pictures/${memory.main_picture}`}
                alt=""
                className="rounded-xl"
              />
            </div>
            {/* Informations */}
            <div className="flex flex-col mt-8">
              {/* Partie "souvenir" */}
              <legend className="text-lg font-bold">Le souvenir</legend>
              <div className="px-5 py-2 border rounded-lg">
                <div className="text-left mt-2">
                  <strong>Description :</strong> {memory.content}
                </div>
                <div className="text-left mt-2">
                  <strong>Date de la photo :</strong> {formattedDate}
                </div>
                <div className="text-left mt-2">
                  <strong>Ajouté par :</strong> {memory.user.firstname}{' '}
                  {memory.user.lastname}
                </div>
              </div>
              {/* Partie "lieu" */}
              <legend className="text-lg font-bold mt-5">Le lieu</legend>
              <div className="px-5 py-2 border rounded-lg">
                <div className="text-left mt-2">
                  <strong>Nom du lieu :</strong> {memory.place.name}
                </div>
                <div className="text-left mt-2">
                  <strong>Type de lieu :</strong> {memory.place.type}
                </div>
              </div>
              {/* Partie "localisation" */}
              <legend className="text-lg font-bold mt-5">
                Sa localisation
              </legend>
              <div className="px-5 py-2 border rounded-lg mb-10">
                <div className="text-left mt-2">
                  <strong>Région :</strong> {memory.location.area}
                </div>
                <div className="text-left mt-2">
                  <strong>Département :</strong> {memory.location.department}
                </div>
                <div className="text-left mt-2">
                  <strong>Quartier :</strong> {memory.location.district}
                </div>
                <div className="text-left mt-2">
                  <strong>Adresse :</strong> {memory.location.street}
                </div>
                <div className="text-left mt-2">
                  <strong>Code postal :</strong> {memory.location.zipcode}
                </div>
                <div className="text-left mt-2">
                  <strong>Ville :</strong> {memory.location.city}
                </div>
              </div>
            </div>

            {/* Demande de confirmation pour la suppression d'un souvenir  */}
            {showConfirmation && (
              <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-70">
                <div className="bg-white p-8 rounded-lg">
                  <p className="mb-4">
                    Etes-vous sûr de vouloir supprimer ce souvenir ?
                  </p>
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
        </>
      )}
    </>
  );
};

export default Memory;
