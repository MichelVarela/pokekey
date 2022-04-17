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
        const min = Math.floor(Math.random() * 806 + 1);
        const res = await axios({url: `https://pokeapi.co/api/v2/pokemon/?limit=8&offset=${min}`})
        const {data} = res;
        
        const dataPokemon = await axios.all(data.results.map(({url}) => axios(url)));
        setPokemon(dataPokemon);
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
              <CartPokemon key={data.name} order={data.order} name={data.name} sprites={data.sprites.other['official-artwork'].front_default ? data.sprites.other['official-artwork'].front_default : unknow} type={data.types[0].type.name}/> 
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
