import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { MdChevronRight } from 'react-icons/md';

// components
import DetailPokemon from '../components/Layouts/DetailPokemon';
import Slideshow from '../components/Layouts/Slideshow';
import Related from '../components/Layouts/Related';

// images 
import unknow from '../images/unknow.png';

//mui
import { CircularProgress } from '@mui/material';

const Detail = () => {

    const {nameID} = useParams();
    
    const [loading, setLoading] = useState(false);
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
    
        const getPokemon = async () => {
    
        try {

        const pokemons = [];

        const res = await axios({url: `https://pokeapi.co/api/v2/pokemon-species/${nameID}`}); // original
        const {data} = res;
        const pokemonA = await axios(data.varieties[0].pokemon.url);
        const dataA = pokemonA.data;

        const des = data.flavor_text_entries.filter(el => el.language.name === 'es');

        const resA = {
            id: dataA.id,
            order: dataA.order, 
            name: dataA.name, 
            sprites: dataA.sprites.other['official-artwork'].front_default ? dataA.sprites.other['official-artwork'].front_default : unknow, 
            description: des[0].flavor_text, 
            weight: dataA.weight, 
            height: dataA.height, 
            typeBase: dataA.types[0].type.name,
            typeSec: dataA.types[1] ? dataA.types[1].type.name : null,
            moveBase: dataA.moves[0] ? dataA.moves[0].move.name : null,
            moveSec: dataA.moves[1] ? dataA.moves[1].move.name : null, 
            hp: dataA.stats[0].base_stat,
            attack: dataA.stats[1].base_stat,
            defense: dataA.stats[2].base_stat,
            special_attack: dataA.stats[3].base_stat,
            special_defense: dataA.stats[4].base_stat,
            speed: dataA.stats[5].base_stat,
        }
        //console.log(resA);
        pokemons.push(resA);
        
        const evolutions = await axios(data.evolution_chain); // evolutions
        const evolveFrom = data.evolves_from_species; // evolve from

        if (evolveFrom !== null) { // evolve from [0]
            const res = await axios (evolveFrom.url);
            const {data} = res;

            const pokemonA = await axios(data.varieties[0].pokemon.url);
            const dataA = pokemonA.data;

            const des = data.flavor_text_entries.filter(el => el.language.name === 'es');

            const resA = {
            id: dataA.id,
            order: dataA.order, 
            name: dataA.name, 
            sprites: dataA.sprites.other['official-artwork'].front_default ? dataA.sprites.other['official-artwork'].front_default : unknow, 
            description: des[0].flavor_text, 
            weight: dataA.weight, 
            height: dataA.height, 
            typeBase: dataA.types[0].type.name,
            typeSec: dataA.types[1] ? dataA.types[1].type.name : null,
            moveBase: dataA.moves[0] ? dataA.moves[0].move.name : null,
            moveSec: dataA.moves[1] ? dataA.moves[1].move.name : null, 
            hp: dataA.stats[0].base_stat,
            attack: dataA.stats[1].base_stat,
            defense: dataA.stats[2].base_stat,
            special_attack: dataA.stats[3].base_stat,
            special_defense: dataA.stats[4].base_stat,
            speed: dataA.stats[5].base_stat,
            }
            //console.log(resA);
            pokemons.push(resA);

            if (data.evolves_from_species !== null) { // evolve from [1]

            const res = await axios (data.evolves_from_species.url);

            const pokemonB = await axios(res.data.varieties[0].pokemon.url);
            const dataB = pokemonB.data;

            const des = res.data.flavor_text_entries.filter(el => el.language.name === 'es');

            const resB = {
                id: dataB.id,
                order: dataB.order, 
                name: dataB.name, 
                sprites: dataB.sprites.other['official-artwork'].front_default ? dataB.sprites.other['official-artwork'].front_default : unknow, 
                description: des[0].flavor_text, 
                weight: dataB.weight, 
                height: dataB.height, 
                typeBase: dataB.types[0].type.name,
                typeSec: dataB.types[1] ? dataB.types[1].type.name : null,
                moveBase: dataB.moves[0] ? dataB.moves[0].move.name : null,
                moveSec: dataB.moves[1] ? dataB.moves[1].move.name : null, 
                hp: dataB.stats[0].base_stat,
                attack: dataB.stats[1].base_stat,
                defense: dataB.stats[2].base_stat,
                special_attack: dataB.stats[3].base_stat,
                special_defense: dataB.stats[4].base_stat,
                speed: dataB.stats[5].base_stat,
            }
            //console.log(resB);
            pokemons.push(resB);
            }
        }

        if (evolutions.data.chain.evolves_to[0] !== undefined) { // evolve to [0]
            const pokemonB = await axios.all(evolutions.data.chain.evolves_to.map(({species}) => axios(species.url)));

            const list = [];

            for (let i = 0; i < pokemonB.length; i++) { // construction object
            
            const des = pokemonB[i].data.flavor_text_entries.filter(el => el.language.name === 'es');
            const res = await axios(pokemonB[i].data.varieties[0].pokemon.url);
            const dataB = res.data;
            const resB = {
                id: dataB.id,
                order: dataB.order, 
                name: dataB.name, 
                sprites: dataB.sprites.other['official-artwork'].front_default ? dataB.sprites.other['official-artwork'].front_default : unknow, 
                description: des[0].flavor_text, 
                weight: dataB.weight, 
                height: dataB.height, 
                typeBase: dataB.types[0].type.name,
                typeSec: dataB.types[1] ? dataB.types[1].type.name : null,
                moveBase: dataB.moves[0] ? dataB.moves[0].move.name : null,
                moveSec: dataB.moves[1] ? dataB.moves[1].move.name : null, 
                hp: dataB.stats[0].base_stat,
                attack: dataB.stats[1].base_stat,
                defense: dataB.stats[2].base_stat,
                special_attack: dataB.stats[3].base_stat,
                special_defense: dataB.stats[4].base_stat,
                speed: dataB.stats[5].base_stat,
            }

            list.push(resB);
            }

            pokemons.push(...list);

            if (evolutions.data.chain.evolves_to[0].evolves_to[0] !== undefined) { // evolve to [1]
            const pokemonC = await axios.all(evolutions.data.chain.evolves_to.map(({evolves_to}) => axios.all(evolves_to.map(({species}) => axios(species.url)))));

            const resA = pokemonC[0];
            const resB = pokemonC[1];

            if (resA) {
                
                const listCA = [];

                for (let i = 0; i < resA.length; i++) { // construction object
                const des = resA[i].data.flavor_text_entries.filter(el => el.language.name === 'es');
                const res = await axios(resA[i].data.varieties[0].pokemon.url);
                const dataCA = res.data;
                const resCA = {
                    id: dataCA.id,
                    order: dataCA.order, 
                    name: dataCA.name, 
                    sprites: dataCA.sprites.other['official-artwork'].front_default ? dataCA.sprites.other['official-artwork'].front_default : unknow, 
                    description: des[0].flavor_text, 
                    weight: dataCA.weight, 
                    height: dataCA.height, 
                    typeBase: dataCA.types[0].type.name,
                    typeSec: dataCA.types[1] ? dataCA.types[1].type.name : null,
                    moveBase: dataCA.moves[0] ? dataCA.moves[0].move.name : null,
                    moveSec: dataCA.moves[1] ? dataCA.moves[1].move.name : null, 
                    hp: dataCA.stats[0].base_stat,
                    attack: dataCA.stats[1].base_stat,
                    defense: dataCA.stats[2].base_stat,
                    special_attack: dataCA.stats[3].base_stat,
                    special_defense: dataCA.stats[4].base_stat,
                    speed: dataCA.stats[5].base_stat,
                }

                listCA.push(resCA);
                }

                pokemons.push(...listCA);

                if (resB) {
                
                const listCB = [];

                for (let i = 0; i < resB.length; i++) { // construction object
                const des = resB[i].data.flavor_text_entries.filter(el => el.language.name === 'es');
                const res = await axios(resB[i].data.varieties[0].pokemon.url);
                const dataCB = res.data;
                const resCB = {
                    id: dataCB.id,
                    order: dataCB.order, 
                    name: dataCB.name, 
                    sprites: dataCB.sprites.other['official-artwork'].front_default ? dataCB.sprites.other['official-artwork'].front_default : unknow, 
                    description: des[0].flavor_text, 
                    weight: dataCB.weight, 
                    height: dataCB.height, 
                    typeBase: dataCB.types[0].type.name,
                    typeSec: dataCB.types[1] ? dataCB.types[1].type.name : null,
                    moveBase: dataCB.moves[0] ? dataCB.moves[0].move.name : null,
                    moveSec: dataCB.moves[1] ? dataCB.moves[1].move.name : null, 
                    hp: dataCB.stats[0].base_stat,
                    attack: dataCB.stats[1].base_stat,
                    defense: dataCB.stats[2].base_stat,
                    special_attack: dataCB.stats[3].base_stat,
                    special_defense: dataCB.stats[4].base_stat,
                    speed: dataCB.stats[5].base_stat,
                }

                listCB.push(resCB);
                }

                pokemons.push(...listCB);

                }
            }
            }
        }

        const set = new Set(pokemons.map(JSON.stringify));
        const filters = Array.from(set).map(JSON.parse);
        const order = filters.sort((a,b) => a.order - b.order);

        setPokemon(order);
        setLoading(true);

        } catch (err) {
        console.log(err);
        }
    }

    getPokemon();

    }, [nameID]);

  return (
    <main className='detail'>
        {
            loading !== false ?
            <>
                <div className="routes">
                    <ul>
                        <li>
                            <Link to={'/'}>Home <MdChevronRight/></Link>
                        </li>
                        <li>
                            {pokemon.map(el => el.id == nameID ? el.name : null)}
                        </li>
                    </ul>
                </div>

                <Slideshow>
                    {
                    pokemon.map(el => {
                        return <DetailPokemon 
                        key={el.order}
                        name={el.name} 
                        order={el.order} 
                        sprite={el.sprites} 
                        weight={el.weight} 
                        height={el.height} 
                        typeBase={el.typeBase}
                        typeSec={el.typeSec}
                        moveBase={el.moveBase}
                        moveSec={el.moveSec}
                        description = {el.description}
                        hp={el.hp}
                        atk={el.attack}
                        def={el.defense}
                        satk={el.special_attack}
                        sdef={el.special_defense}
                        spd={el.speed}
                        />
                    })}
                </Slideshow>

                <div>
                    {
                        pokemon.map(el => {
                            if (el.id == nameID) {
                                return <Related type={el.typeBase} id={nameID} key={nameID}/>
                            }
                        })
                    }
                </div>
            </> :
            <div className="content-progress">
                <CircularProgress color='success'/> 
            </div>
        }
        
    </main>
  )
}

export default Detail;