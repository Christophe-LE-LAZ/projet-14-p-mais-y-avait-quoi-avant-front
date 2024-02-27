import React from 'react';

export default function AboutUs() {
  return (
    <div>
      <h1 className='flex justify-center text-3xl mb-14'>Notre equipe</h1>
      <div className="max-w-5xl m-auto grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="avatar pb-12 items-center lg:flex-col lg:text-center flex-grow">
          <div className="max-w-24 rounded-full m-5">
            <img
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="avatar"
            />
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis et
            cum inventore ducimus dicta assumenda.
          </p>
        </div>
        <div className="avatar pb-12 items-center lg:flex-col lg:text-center flex-grow">
          <div className="max-w-24 rounded-full m-5">
            <img
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="avatar"
            />
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            facere doloremque aliquam maiores tempore rem? Dolore, modi!
          </p>
        </div>
        <div className="avatar pb-12 items-center lg:flex-col lg:text-center flex-grow">
          <div className="max-w-24 rounded-full m-5">
            <img
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="avatar"
            />
          </div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque
            totam ullam molestias facilis aut!
          </p>
        </div>
        <div className="avatar pb-12 items-center lg:flex-col lg:text-center flex-grow">
          <div className="max-w-24 rounded-full m-5">
            <img
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="avatar"
            />
          </div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ad,
          ex dolore saepe iusto vero recusandae.
        </div>
        <div className="avatar pb-12 items-center lg:flex-col lg:text-center flex-grow">
          <div className="max-w-24 rounded-full m-5">
            <img
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="avatar"
            />
          </div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id obcaecati
          numquam velit nulla!
        </div>
      </div>
    </div>
  );
}
