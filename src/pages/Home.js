import React, {useState, useEffect} from 'react';
import axios from 'axios';

// components
import CartPokemon from '../components/Layouts/CartPokemon';

// images
import unknow from '../images/unknow.png';

const Home = () => {

  const min = Math.floor(Math.random() * 806 + 1);

  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {

    const getPokemon = async () => {
      try {

        const list = [];

        const res = await axios({url: `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${min}`})

        const {data} = res;
        data.results.map( async ({url}) => {
          
          try {
            const res = await axios({url: `${url}`});
            const {data} = res;
            list.push(data);
            
          } catch (err) {
            console.log(err);
          }
        });

        setPokemon(list);
        
      } catch (err) {
        console.log(err);
      }
    }

    getPokemon();
    
  }, [setPokemon]);    
  
  console.log(pokemon);

  return (
    <main className='home'>
        <h2>welcome to pokekey</h2>

        {pokemon.map(({order, name, sprites, types}) => (
            <CartPokemon key={name} order={order} name={name} sprites={sprites.other['official-artwork'].front_default ? sprites.other['official-artwork'].front_default : unknow} type={types[0].type.name}/> 
        ))}
    </main>
    )
};

export default Home;
