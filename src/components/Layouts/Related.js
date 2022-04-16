import React, { useState, useEffect } from 'react';
import axios from 'axios';

//components
import CartPokemon from './CartPokemon';
import Slideshow from './Slideshow';

// images
import unknow from '../../images/unknow.png';

const Related = ({type, id}) => {

    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {

        const getURL = async () => {

            try {

                const res = await axios({url: `https://pokeapi.co/api/v2/type/${type}`});
                const {data} = res;

                const dataPokemon = await axios.all(data.pokemon.map(({pokemon}) => axios(pokemon.url)));
                const total = dataPokemon.length;
                
                function random(min, max) {
                    return parseInt(min + Math.random() * (max - min));
                }

                const max = random(7,total); // devuelve un valor random entre 0 y el largo del array
                const min = max - 8; // devuelve un maximo de 8 elementos

                const filters = [];

                for (let i = min; i < max; i++) {
                    filters.push(dataPokemon[i]); // devuelve los elementos de forma aleatoria
                }

                setPokemon(filters);
                
            } catch (err) {
                console.log(err);
            }
        }

        if (type !== undefined) {
           return getURL()  
        }

    }, [type, id]);  

  return (
    <div className='related'>
        <h2>Relacionados</h2>

        <Slideshow>
        {
                type !== undefined ?
                pokemon.map(({data}) => (
                    <CartPokemon key={data.name} order={data.order} name={data.name} sprites={data.sprites.other['official-artwork'].front_default ? data.sprites.other['official-artwork'].front_default : unknow} type={data.types[0].type.name}/> 
                )) :
                null
            }
        </Slideshow>
            
    </div>
  )
}

export default Related;