import { Link } from 'react-router-dom';
import { IDataCreated } from '../../types/memory';

interface Props {
  memory: IDataCreated;
}

export default function Card({ memory }: Props) {
  // Convertir la date en objet Date
  const memoryDate = new Date(memory.picture_date);
  // Formater la date pour afficher uniquement l'année
  const formattedDate = memoryDate.toLocaleString(undefined, {
    year: 'numeric',
  });

  return (
    <Link to={`/memories/${memory.id}`}>
      <div className="card bg-base-200 shadow-xl mx-2 mb-10 px-6 pt-3 w-80 h-80 text-center">
        <h2 className="text-lg font-bold">{memory.title} </h2>
        <h3 className="italic text-sm">
          {memory.location.city}, {formattedDate}
        </h3>
        <div className="flex pt-4 justify-center align-bottom">
          <div className="w-72 h-56 overflow-hidden">
            <img
              src={`https://admin.auparavant.fr/assets/pictures/${memory.main_picture}`}
              alt=""
              className="rounded-xl w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="card-body items-center text-center "></div>
      </div>
    </Link>
  );
}
