import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { MdChevronRight } from 'react-icons/md';

// components
import DetailPokemon from '../components/Layouts/DetailPokemon';

// images 
import unknow from '../images/unknow.png';

const Detail = () => {

    const {pathname} = useLocation();
    const URLname = pathname.slice(8);
    
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        
        const getPokemon = async() => {
            const res = await axios({url: `https://pokeapi.co/api/v2/pokemon/${URLname}`})

                let {order, name, sprites, weight, height, types, moves, stats} = res.data;
                
                return setPokemon(
                    {
                        order, 
                        name, 
                        sprite: sprites.other['official-artwork'].front_default ? sprites.other['official-artwork'].front_default : unknow, 
                        weight, 
                        height, 
                        typeBase: types[0].type.name,
                        typeSec: types[1] ? types[1].type.name : null,
                        moveBase: moves[0] ? moves[0].move.name : null,
                        moveSec: moves[1] ? moves[1].move.name : null,
                        hp: stats[0].base_stat,
                        attack: stats[1].base_stat,
                        defense: stats[2].base_stat,
                        special_attack: stats[3].base_stat,
                        special_defense: stats[4].base_stat,
                        speed: stats[5].base_stat
                    }
                )   
        }

        return getPokemon();
    
    }, [URLname]);

    //console.log(pokemon.moves);

  return (
    <main className='detail'>
        <div className="routes">
            <ul>
                <li>
                    <Link to={'/'}>Home <MdChevronRight/></Link>
                </li>
                <li>
                    {URLname}
                </li>
            </ul>
        </div>

        <DetailPokemon 
        name={pokemon.name} 
        order={pokemon.order} 
        sprite={pokemon.sprite} 
        weight={pokemon.weight} 
        height={pokemon.height} 
        typeBase={pokemon.typeBase}
        typeSec={pokemon.typeSec}
        moveBase={pokemon.moveBase}
        moveSec={pokemon.moveSec}
        hp={pokemon.hp}
        atk={pokemon.attack}
        def={pokemon.defense}
        satk={pokemon.special_attack}
        sdef={pokemon.special_defense}
        spd={pokemon.speed}
        />
    </main>
  )
}

export default Detail;