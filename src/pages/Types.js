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
      
        const getPokemon = () => {

            const list = [];

            try {
                axios({url:`${URLbase}${pathname}`})
                .then(({data}) => {
                    data.pokemon.map(({pokemon}) => {
                        return axios({url: `${pokemon.url}`})
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
        <ul>
            {pokemon.map(({name, base_experience}) => console.log(name, base_experience))} 
        </ul> 
    </main>
  )
}

export default Types;