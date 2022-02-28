import React, {useState, useEffect} from 'react';
import axios from 'axios';

// components
import CartPokemon from '../components/Layouts/CartPokemon';

// images
import unknow from '../images/unknow.png';

const Home = () => {

  const [dataURL, setDataURL] = useState([]);
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {

    const getURL = async () => {

      try {
        const min = Math.floor(Math.random() * 806 + 1);
        const res = await axios({url: `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${min}`})
        const {data} = res;
        setDataURL(data.results)
        
      } catch (err) {
        console.log(err);
      }
    }

    const getPokemon = async () => { 

      try {
        getURL() 
        const res = await axios.all(dataURL.map(({url}) => axios.get(url)))
        setPokemon(res);
        
      } catch (err) {
        console.log(err);
      }
    }

    return getPokemon(); 

  }, [])   
  
  console.log(dataURL); 

  //console.log(dataURL);
  //console.log(pokemon)   

  return (
    <main className='home'>
        <h2>welcome to pokekey</h2>

        {pokemon.map(({data}) => (
            <CartPokemon key={data.name} order={data.order} name={data.name} sprites={data.sprites.other['official-artwork'].front_default ? data.sprites.other['official-artwork'].front_default : unknow} type={data.types[0].type.name}/> 
        ))}
    </main>
    )
}; 

export default Home;
