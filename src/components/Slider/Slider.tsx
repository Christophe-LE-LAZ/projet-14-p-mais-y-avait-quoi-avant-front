import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchRandomMemory } from '../../store/randomMemoryReducer';

const Slider = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchRandomMemory());
  }, []);

  const randomPicture = useAppSelector(
    (state) => state.randomMemory.picture
  );

  const imageUrl1 = `https://admin.auparavant.fr/assets/pictures/${randomPicture.picture1}`;
  const imageUrl2 = `https://admin.auparavant.fr/assets/pictures/${randomPicture.picture2}`;

  return (
    <div className="max-w-screen-xl mx-auto p-5">
      <div className="diff aspect-[16/9]">
        <div className="diff-item-1">
          <img className="m-auto" alt="test" src={imageUrl1} />
        </div>
        <div className="diff-item-2">
          <img className="m-auto" alt="test" src={imageUrl2} />
        </div>
        <div className="diff-resizer"></div>
      </div>
    </div>
  );
};

export default Slider;
