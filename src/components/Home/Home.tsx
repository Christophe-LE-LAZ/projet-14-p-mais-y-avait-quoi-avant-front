import Slider from '../Slider/Slider';
import Map from '../Map/Map';
import Card from '../../components/Card/Card';
import './Home.scss';
import { useAppDispatch, useAppSelector,  } from '../../hooks';
import { useEffect } from 'react';
import { fetchMemories } from '../../store/memoriesReducer';

export default function Home() {

  const dispatch = useAppDispatch();

  // Récupération des souvenirs depuis l'API
    useEffect(() => {
      dispatch(fetchMemories());
    }, []);


  // Récupération des valeurs du state
  const memoriesList = useAppSelector((state) => state.memories.list);

  return (
    <div className="">
      <div className="">
        <h1 className="flex justify-center text-2xl pb-5 sm:text-3xl sm:pb-10 lg:text-4xl lg:pb-14">
          Auparavant
        </h1>
        <p className="pb-3 w-4/5 mx-auto text-center text-sm lg:text-base lg:leading-relaxed lg:hidden">
          Nos villes évoluent, et par conséquent nos quartiers, nos lieux
          préférés également... Saurions nous dire ce qu'il y avait avant à tel
          endroit ? Probablement que non. Après avoir constaté cela, on
          s'interroge, existe-t-il des ressources sur le web nous permettant
          facilement d'accéder à la donnée ? Wikipédia répond en partie à ça
          mais il faut souvent multiplier les recherches pour trouver les
          informations sur un lieu à différentes époques.
        </p>
      </div>
      <div className="lg:hidden">
        <Slider />
      </div>
      <div className="hidden lg:grid lg:grid-cols-3 lg:text-base lg:leading-relaxed">
        <p className="p-5">
          Nos villes évoluent, et par conséquent nos quartiers, nos lieux
          préférés également... Saurions nous dire ce qu'il y avait avant à tel
          endroit ? Probablement que non. Après avoir constaté cela, on
          s'interroge, existe-t-il des ressources sur le web nous permettant
          facilement d'accéder à la donnée ? Wikipédia répond en partie à ça
          mais il faut souvent multiplier les recherches pour trouver les
          informations sur un lieu à différentes époques.
        </p>
        <div className="col-span-2">
          <Slider />
        </div>
      </div>
      <h2 className="text-center mt-5 mb-5 text-xl sm:text-2xl lg:text-3xl">
        Chercher sur la carte
      </h2>
      <Map />
      <h2 className="text-center mt-5 mb-10 text-xl sm:text-2xl lg:text-3xl">
        Les derniers souvenirs ajoutés
      </h2>
      <div className="flex flex-wrap justify-center gap-5">
        {memoriesList.slice(0, 3).map((memory) => (
          <Card key={memory.id} memory={memory} />
        ))}
      </div>
    </div>
  );
}
