import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// components
import CartPokemon from '../components/Layouts/CartPokemon';

// images 
import unknow from '../images/unknow.png';
import search from '../images/search.svg';

const Search = () => {

  const [filter, setFilter] = useState([]);
  const {query} = useParams();

  useEffect(() => {

    const searching = async () => {

      const res = await axios ('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1126');
      const result = res.data.results.filter(el => {
        if (el.name.toLowerCase().includes(query.toLowerCase().trim())) {
          return el;
        }
      });
  
      if (result.length !== 0) {

        const res = await axios.all(result.map(({name}) => axios(`https://pokeapi.co/api/v2/pokemon/${name}`)));
        return setFilter(res); 

      } else {
        return setFilter('no hay coincidencias');
      }
    }
  
    searching();
    
  }, [query])

  //console.log(filter);

  return (
    <main className='search'>

        {
          filter === 'no hay coincidencias' ? 
          <>
          <h2> Ups! No encontramos resultados</h2>
          <div className="content">
            <img src={search} alt="pikachu-search" className='pikachu-search'/>
          </div>
          </> : 
          <>
          <div className="routes">
            <ul>
              <li>Resultados de busqueda</li>
            </ul>
          </div>
          <div className="content-pokemon">
            {filter.map(({data}) => (
                <CartPokemon key={data.name} order={data.order} name={data.name} sprites={data.sprites.other['official-artwork'].front_default ? data.sprites.other['official-artwork'].front_default : unknow} type={data.types[0].type.name}/> 
            ))}
          </div>
          </>
        }
    </main>
  )
}

export default Search;