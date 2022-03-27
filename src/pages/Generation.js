import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { MdChevronRight } from 'react-icons/md';
import { useParams, Link } from 'react-router-dom';

// components
import CartPokemon from '../components/Layouts/CartPokemon';

// images 
import unknow from '../images/unknow.png';

const Generation = () => {

    const URLbase = 'https://pokeapi.co/api/v2/generation/';
    let { id } = useParams();

    const [pokemon, setPokemon] = useState([]);
    const [dataPokemon, setDataPokemon] = useState([]);

    useEffect(() => {
      
        const getPokemon = async () => {

            try {
                const res = await axios({url: `${URLbase}${id}`});
                const {data} = res;
                setPokemon(data.pokemon_species);

            } catch (err) {
                console.log(err);
            }
        }

        const getData = async () => {

            try {
                getPokemon();
                const res = await axios.all(pokemon.map(({url}) => axios(url))); 

                const dataURL = await axios.all(res.map(({data}) => axios({url: data.varieties[0].pokemon.url})));
                
                const ordered = dataURL.sort((a,b) => a.data.order - b.data.order);
                setDataPokemon(ordered);

            } catch (err) {
                console.log(err);
            }
        }

        getData();

    }, [id, pokemon]);  
    
    //console.log(dataPokemon);   

  return (
    <main className='generation'>
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
            {dataPokemon.map(({data}) => (
                <CartPokemon key={data.name} order={data.order} name={data.name} sprites={data.sprites.other['official-artwork'].front_default ? data.sprites.other['official-artwork'].front_default : unknow} type={data.types[0].type.name}/> 
            ))}
        </div>
         
    </main>
  )
}

export default Generation;