import { useState } from 'react';
import Slider from 'react-slider';
import './YearSlider.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setYears } from '../../store/filterReducer';

export default function YearSlider() {
  // Récupération des valeurs du state
  const years = useAppSelector((state) => state.filter.years);

  const dispatch = useAppDispatch();

  // Configuration du slider
  const MIN = 1700;
  const MAX = 2050;
  const [values, setValues] = useState([MIN, MAX]);

  // Mise à jour du state redux
  const handleSliderChange = () => {
    dispatch(setYears(values));
  }

  return (
    <div className="flex flex-col">
      <div className="text-center p-3">
        {' '}
        {years[0]} - {years[1]}
      </div>
      <Slider
        className="slider"
        onChange={setValues}
        onAfterChange={handleSliderChange}
        value={years}
        min={MIN}
        max={MAX}
      />
    </div>
  );
}
