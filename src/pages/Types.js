import React, {useState, useEffect} from 'react';
import { MdChevronRight } from 'react-icons/md';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

// components
import CartPokemon from '../components/Layouts/CartPokemon';

// images 
import unknow from '../images/unknow.png';

const Types = () => {

    const URLbase = 'https://pokeapi.co/api/v2';
    const { pathname } = useLocation();
    const title = pathname.slice(6);

    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
      
        const getPokemon = async() => {

            try {

                const list = [];

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

    //console.log(pokemon)  
    
  return (
    <main className='types'>
        <div className="routes">
            <ul>
                <li>
                    <Link to={'/'}>Home <MdChevronRight/></Link>
                </li>
                <li>
                    {title}
                </li>
            </ul>
        </div>

        <div className="content-pokemon">
            {pokemon.map(({order, name, sprites, types}) => (
                <CartPokemon key={name} order={order} name={name} sprites={sprites.other['official-artwork'].front_default ? sprites.other['official-artwork'].front_default : unknow} type={types[0].type.name}/> 
            ))}
        </div>
         
    </main>
  )
}

export default Types;