import React, { useState, useEffect } from 'react';
import axios from 'axios';

// components
import CartPokemon from '../components/Layouts/CartPokemon';

// images
import unknow from '../images/unknow.png';

//mui
import { CircularProgress } from '@mui/material';

const Home = () => {

  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {

    const getURL = async () => {

      try {
        const min = Math.floor(Math.random() * 891);
        const res = await axios(`https://pokeapi.co/api/v2/pokemon-species/?offset=${min}&limit=8`);
        const {data} = res;
        const pokemonURL = await axios.all(data.results.map(({url}) => axios(url)));
        const pokemonData = await axios.all(pokemonURL.map(el => axios(el.data.varieties[0].pokemon.url)))

        setPokemon(pokemonData);
        setLoading(true);

      } catch (err) {
        console.log(err);
      }
    }

    return getURL()

  }, []);   

  return (
    <main className='home'>
      { 
      loading !== false ?
      <> 
        <h2>welcome to pokekey</h2>

        <div className="content-pokemon">
          {pokemon.map(({data}) => (
              <CartPokemon key={data.name} id={data.id} order={data.order} name={data.name} sprites={data.sprites.other['official-artwork'].front_default ? data.sprites.other['official-artwork'].front_default : unknow} type={data.types[0].type.name}/> 
          ))}
        </div>
      </> :
      <div className="content-progress">
        <CircularProgress color='success'/> 
      </div>
    }
        
    </main>
    )
}; 

export default Home;
