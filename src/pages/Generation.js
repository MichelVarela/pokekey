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
    const {id} = useParams();

    const [pokemon, setPokemon] = useState({title: null, el: []});

    useEffect(() => {
      
        const getPokemon = async () => {

            try {
                const resA = await axios({url: `${URLbase}${id}`});
                const {data} = resA;

                const resB = await axios.all(data.pokemon_species.map(({url}) => axios(url))); 

                const dataURL = await axios.all(resB.map(({data}) => axios({url: data.varieties[0].pokemon.url})));
                
                const ordered = dataURL.sort((a,b) => a.data.order - b.data.order);
                setPokemon({title: resA.data.main_region.name,el: ordered});

            } catch (err) {
                console.log(err);
            }
        }

        getPokemon();

    }, [id]); 
    
    //console.log(dataPokemon);   

  return (
    <main className='generation'>
        <div className="routes">
            <ul>
                <li>
                    <Link to={'/'}>Home <MdChevronRight/></Link>
                </li>
                <li>
                    {pokemon.title}
                </li>
            </ul>
        </div>

        <div className="content-pokemon">
            {pokemon.el.map(({data}) => (
                <CartPokemon key={data.name} order={data.order} name={data.name} sprites={data.sprites.other['official-artwork'].front_default ? data.sprites.other['official-artwork'].front_default : unknow} type={data.types[0].type.name}/> 
            ))}
        </div>
         
    </main>
  )
}

export default Generation;