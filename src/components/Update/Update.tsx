import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ChangeEvent } from 'react';
import { TInputNameMemory, TInputNamePlace } from '../../types/inputName';
import {
  changeFieldStateMemory,
  changeFieldStatePlace,
  updateMemory,
  updatedMemory,
} from '../../store/updateMemoryReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { setMessage } from '../../store/messageReducer';
import axios from 'axios';
import { fetchSingleMemory } from '../../store/singleMemoryReducer';

export default function Update() {
  const { id } = useParams<{ id: string }>();

  // Récupération du souvenir depuis l'API
  useEffect(() => {
    const memoryId = Number(id);
    dispatch(fetchSingleMemory(memoryId as number));
  }, []);

  // Lecture des states
  const { title, content, picture_date } = useAppSelector(
    (state) => state.singleMemory.memory
  );
  const memoryID = useAppSelector((state) => state.singleMemory.memory.id);
  const { name, type } = useAppSelector(
    (state) => state.singleMemory.memory.place
  );
  const placeID = useAppSelector((state) => state.singleMemory.memory.place.id);

  const {
    area,
    department,
    district,
    street,
    city,
    zipcode,
    latitude,
    longitude,
  } = useAppSelector((state) => state.singleMemory.memory.location);

  const { error, loading } = useAppSelector((state) => state.updateMemory);

  // Formattage de la date de l'image
  const formattedDate = picture_date.substring(0, 10);

  // Caractéristiques des inputs à mapper
  const memoryInputs = [
    {
      label: 'Titre du souvenir',
      name: 'title',
      type: 'text',
      defaultValue: title,
      required: true,
    },
    {
      label: 'Description du souvenir',
      name: 'content',
      type: 'text',
      defaultValue: content,
      required: true,
    },
    {
      label: 'Date du souvenir',
      name: 'picture_date',
      type: 'date',
      defaultValue: formattedDate,
      required: true,
    },
  ];

  const photoInputs = [
    {
      label: 'Photographie principale',
      name: 'main_picture',
      type: 'file',
      required: false,
    },
    {
      label: 'Photographie supplémentaire',
      name: 'additionnal_pictures',
      type: 'file',
      required: false,
    },
  ];

  const placeInputs = [
    {
      label: "Nom de l'endroit",
      name: 'name',
      type: 'text',
      defaultValue: name,
      required: false,
    },
    {
      label: "Type d'endroit",
      name: 'type',
      type: 'text',
      defaultValue: type,
      required: true,
    },
  ];

  const locationInputs = [
    {
      label: 'Région',
      name: 'area',
      required: true,
      value: area,
      readOnly: true,
      disabled: true,
    },
    {
      label: 'Département',
      name: 'department',
      required: true,
      value: department,
      readOnly: true,
      disabled: true,
    },
    {
      label: 'Quartier',
      name: 'district',
      type: 'text',
      required: false,
      value: district,
      readOnly: true,
      disabled: true,
    },
    {
      label: 'Adresse',
      name: 'street',
      type: 'text',
      required: true,
      value: street,
      readOnly: true,
      disabled: true,
    },
    {
      label: 'Ville',
      name: 'city',
      type: 'text',
      required: true,
      value: city,
      readOnly: true,
      disabled: true,
    },
    {
      label: 'Code postal',
      name: 'zipcode',
      type: 'number',
      required: true,
      value: zipcode,
      readOnly: true,
      disabled: true,
    },
    {
      label: 'Latitude',
      name: 'latitude',
      type: 'text',
      required: true,
      value: latitude,
      readOnly: true,
      disabled: true,
    },
    {
      label: 'Longitude',
      name: 'longitude',
      type: 'text',
      required: true,
      value: longitude,
      readOnly: true,
      disabled: true,
    },
  ];

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Envoi des valeurs entrées dans la partie Souvenir vers le state
  const handleBlurMemory = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValueM = e.target.value as string;
    const inputNameM = e.target.name as TInputNameMemory;
    dispatch(changeFieldStateMemory({ inputValueM, inputNameM }));
  };

  // Envoi des valeurs entrées dans la partie Lieu vers le state
  const handleBlurPlace = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValueP = e.target.value as string;
    const inputNameP = e.target.name as TInputNamePlace;
    dispatch(changeFieldStatePlace({ inputValueP, inputNameP }));
  };

  // Stockage de la main picture dans un state
  const [mainPicture, setMainPicture] = useState({} as File);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMainPicture(e.target.files[0]);
    }
  };

  // Dispatch pour la modification d'un souvenir
  const handleSubmitUpdateMemory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const IDs = [memoryID, placeID];
    dispatch(updateMemory(IDs))
      .unwrap()
      .then((response) => {
        if (mainPicture) {
          const formData = new FormData();
          formData.append('main_picture', mainPicture);
          axios
            .post(
              `https://admin.auparavant.fr/api/secure/upload_update/main_picture/${id}`,
              formData,
              {
                headers: {
                  'content-type': 'multipart/form-data',
                },
              }
            )
            .then((response) => {
            dispatch(updatedMemory());
            dispatch(setMessage('Votre souvenir a été modifié avec succès.'));
            navigate(`/memories/${response.data.memory.id}`);
            console.log(response);
            })
            ;
        } else {
          dispatch(updatedMemory());
          dispatch(setMessage('Votre souvenir a été modifié avec succès.'));
          navigate(`/memories/${response.memory.id}`);
          console.log(response);
        }
      });
  };

  return (
    <div className="">
      <div className="flex flex-col items-center">
        <h2 className="text-center text-2xl mb-2">Modifier votre souvenir</h2>
      </div>
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmitUpdateMemory}
      >
        <p className="text-center ml-5 text-xs mt-3">* champs obligatoires</p>
        <div className="sm:flex gap-6">
          <div>
            {/* Le souvenir */}
            <fieldset className="mt-5 p-5 border rounded-lg">
              <legend className="text-lg">Votre souvenir</legend>
              {memoryInputs.map(
                ({ label, name, type, defaultValue, required }) => (
                  <label key={name} className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">
                        {label} {required && '*'}{' '}
                      </span>
                    </div>
                    <input
                      type={type}
                      className="input input-bordered w-full max-w-xs"
                      name={name}
                      required={required}
                      defaultValue={defaultValue}
                      onBlur={handleBlurMemory}
                    />
                  </label>
                )
              )}
            </fieldset>

            {/* Le lieu */}
            <fieldset className="mt-5 p-5 border rounded-lg">
              <legend className="text-lg">Le lieu</legend>
              {placeInputs.map(
                ({ label, name, type, defaultValue, required }) => (
                  <label key={name} className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">
                        {label} {required && '*'}
                      </span>
                    </div>
                    <input
                      type={type}
                      className="input input-bordered w-full max-w-xs"
                      name={name}
                      required={required}
                      defaultValue={defaultValue}
                      onBlur={handleBlurPlace}
                    />
                  </label>
                )
              )}
            </fieldset>

            {/* Les photos */}
            <fieldset className="mt-5 p-5 border rounded-lg">
              <legend className="text-lg">Les photographies</legend>
              {photoInputs.map(({ label, name, type, required }) => (
                <label key={name} className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">
                      {label} {required && '*'}{' '}
                    </span>
                  </div>
                  <input
                    type={type}
                    className="file-input file-input-bordered w-full max-w-xs"
                    name={name}
                    required={required}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
              ))}
            </fieldset>
          </div>

          {/* Sa localisation */}
          <fieldset className="mt-5 p-5 border rounded-lg">
            <legend className="text-lg">La localisation</legend>
            {locationInputs.map(
              ({ label, name, type, value, required, readOnly, disabled }) => (
                <label key={name} className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">
                      {label}
                      {required && '*'}
                    </span>
                  </div>
                  <input
                    type={type}
                    className="input input-bordered w-full max-w-xs"
                    name={name}
                    required={required}
                    value={value}
                    readOnly={readOnly}
                    disabled={disabled}
                  />
                </label>
              )
            )}
          </fieldset>
        </div>

        <div className="flex content-center mt-6">
          {/* Bouton de soumission du formulaire */}
          <button
            type="submit"
            className="h-12 rounded-lg p-3 bg-base-200 text-sm"
          >
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
        <div className="flex justify-center">
          <div role="alert" className="alert alert-error max-w-xs">
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}
