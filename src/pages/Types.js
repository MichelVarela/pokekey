import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

// components
import CartPokemon from '../components/Layouts/CartPokemon';

const Types = () => {

    const URLbase = 'https://pokeapi.co/api/v2';
    const { pathname } = useLocation();

    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
      
        const getPokemon = async() => {

            const list = [];

            try {
                await axios({url:`${URLbase}${pathname}`})
                .then(({data}) => {
                    data.pokemon.map(async({pokemon}) => {
                        await axios({url: `${pokemon.url}`})
                        .then(({data}) => {
                            list.push(data);
                        })
                    })
                }) 

                return setPokemon(list);

            } catch (err) {
                console.log(err);
            }
        }

        return getPokemon();   

    }, [pathname])

    // console.log(pokemon)    
    
  return (
    <main className='types'>
        {pokemon.map(({order, name, sprites}) => (
            <CartPokemon key={name} order={order} name={name} sprites={sprites.other['official-artwork'].front_default} /> 
        ))} 
    </main>
  )
}

export default Types;