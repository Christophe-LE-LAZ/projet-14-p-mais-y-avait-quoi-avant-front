import React, { useCallback, useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  useMapEvent,
  Marker,
  Popup,
} from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'dist/assets/marker-shadow.png';
import 'dist/assets/marker-icon.png';
import './Map.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchLocations } from '../../store/locationsReducer';
import { fetchMemories } from '../../store/memoriesReducer';
import { Link } from 'react-router-dom';
import {
  setCoordState,
  setLocationState,
} from '../../store/createMemoryReducer';

// Définir un type pour les propriétés du Marker
interface CustomMarkerProps {
  position: [number, number];
  eventHandlers: {
    click: (event: LeafletMouseEvent, location: any) => void;
  };
}

export default function Map() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLocations());
    dispatch(fetchMemories());
  }, [dispatch]);

  const locationsList = useAppSelector((state) => state.locations.list);
  const memoriesList = useAppSelector((state) => state.memories.list);

  function MapClickHandler({
    onClick,
  }: {
    onClick: (event: LeafletMouseEvent) => void;
  }) {
    useMapEvent('click', (event) => {
      onClick(event);
    });
    return null;
  }

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    const coord = { lat, lng };
    dispatch(setCoordState(coord));
  }, [dispatch]);

  const handleClickPopup = (event: LeafletMouseEvent, location: any) => {
    dispatch(setLocationState(location));
  };

  const [selectedType, setSelectedType] = useState('');

  const filteredLocations = locationsList.filter((location) => {
    const memoriesInLocation = memoriesList.filter((memory) => memory.location.id === location.id);
    const typesInLocation = memoriesInLocation.map((memory) => memory.place.type);
    return typesInLocation.includes(selectedType) || selectedType === '';
  });

  return (
    <div className="p-5 m-auto">
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredLocations.map((location) => (
          <div key={location.id}>
            {/* Utiliser le type personnalisé pour Marker */}
            <Marker
              position={[Number(location.latitude), Number(location.longitude)]}
              eventHandlers={{
                click: (event: LeafletMouseEvent) => handleClickPopup(event, location),
              }}
            >
              <Popup>
                {memoriesList.map((memory) => {
                  if (location.id === memory.location.id && (selectedType === '' || memory.place.type === selectedType)) {
                    return (
                      <Link to={`/memories/${memory.id}`} key={memory.id}>
                        <p>{memory.title}</p>
                      </Link>
                    );
                  }
                  return null;
                })}
              </Popup>
            </Marker>
          </div>
        ))}
        <MapClickHandler onClick={handleMapClick} />
      </MapContainer>
    </div>
  );
}
