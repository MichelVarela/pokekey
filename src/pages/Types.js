import React, {useState, useEffect} from 'react';
import { MdChevronRight } from 'react-icons/md';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

// components
import CartPokemon from '../components/Layouts/CartPokemon';

// images 
import unknow from '../images/unknow.png';

const Types = () => {

    const URLbase = 'https://pokeapi.co/api/v2/type/';
    const {id} = useParams();

    const [dataURL, setDataURL] = useState([]);
    const [pokemon, setPokemon] = useState([]);

     useEffect(() => {

        const getURL = async () => {

            try {
                const res = await axios({url:`${URLbase}${id}`});
                const {data} = res;
                setDataURL(data.pokemon);
                
            } catch (err) {
                console.log(err);
            }
        }

        const getPokemon = async () => {

            try {
                getURL()
                const res = await axios.all(dataURL.map(({pokemon}) => axios(pokemon.url)))
                setPokemon(res);
                
            } catch (err) {
                console.log(err);
            }
        }

        return getPokemon();
       
     }, [dataURL, id])
     
     //console.log(dataURL);
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