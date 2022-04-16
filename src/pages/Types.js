import React, {useState, useEffect} from 'react';
import { MdChevronRight } from 'react-icons/md';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

// components
import CartPokemon from '../components/Layouts/CartPokemon';
import Pagination from '../components/Layouts/Pagination';

// images 
import unknow from '../images/unknow.png';

const Types = () => {

    const URLbase = 'https://pokeapi.co/api/v2/type/';
    const {id} = useParams();

    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {

        const getURL = async () => {

            try {
                const resA = await axios({url:`${URLbase}${id}`});
                const {data} = resA;
                
                const resB = await axios.all(data.pokemon.map(({pokemon}) => axios(pokemon.url)));
                setPokemon(resB);
                
            } catch (err) {
                console.log(err);
            }
        }

        getURL();
      
    }, [id])

     //console.log(pokemon);
    
  return (
    <main className='types'>
        <div className="routes">
            <ul>
                <li>
                    <Link to={'/'}>Home <MdChevronRight/></Link>
                </li>
                <li>
                    {id}
                </li>
            </ul>
        </div>

        <div className="content-pokemon">
            {pokemon.map(({data}) => (
                <CartPokemon key={data.name} order={data.order} name={data.name} sprites={data.sprites.other['official-artwork'].front_default ? data.sprites.other['official-artwork'].front_default : unknow} type={data.types[0].type.name}/> 
            ))}
        </div>
         
    </main>
  )
}

export default Types;