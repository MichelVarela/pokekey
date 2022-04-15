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

const Detail = () => {

    const {nameID} = useParams();
    
    const [pokemon, setPokemon] = useState({});
    const [evolveFrom, setEvolveFrom] = useState(null);
    const [evolveTo, setEvolveTo] = useState([]);

    useEffect(() => {

        const getPokemon = async () => {

            try {
                const res = await axios({url: `https://pokeapi.co/api/v2/pokemon/${nameID}`});
                const {order, name, sprites, weight, height, types, moves, stats, species} = res.data;

                const evolveURL = await axios({url: species.url});
                const {evolution_chain, evolves_from_species, flavor_text_entries} = evolveURL.data;

                const des = flavor_text_entries.filter(el => el.language.name === 'es');

                const getEvolveFrom = async () => {
                    try {
                        const res = await axios({url: `https://pokeapi.co/api/v2/pokemon/${evolves_from_species.name}`});
                        const {order, name, sprites, weight, height, types, moves, stats, species} = res.data;
                        
                        const resD = await axios(species.url);

                        const des = resD.data.flavor_text_entries.filter(el => el.language.name === 'es');

                        setEvolveFrom(
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
                                description: des[0].flavor_text,
                                hp: stats[0].base_stat,
                                attack: stats[1].base_stat,
                                defense: stats[2].base_stat,
                                special_attack: stats[3].base_stat,
                                special_defense: stats[4].base_stat,
                                speed: stats[5].base_stat,
                            }
                        )  

                    } catch (err) {
                        console.log(err);
                    }
                }

                const getEvolveTo = async () => {
                    try {
                        const res = await axios({url: evolution_chain.url});
                        const {chain} = res.data;

                        let list = [];

                        if (typeof chain.evolves_to[0] !== 'undefined') {
                            const evolves = chain.evolves_to.map(({species}) => species.name);
                            const evolveA = await axios.all(evolves.map(name => axios({url: `https://pokeapi.co/api/v2/pokemon/${name}`})));

                            for (let i = 0; i < evolveA.length; i++) { // update del species con el text description
                                
                                const res = await axios(evolveA[i].data.species.url);
                                const des = res.data.flavor_text_entries.filter(el => el.language.name === 'es');

                                evolveA[i].data.species = des[0].flavor_text;

                                //console.log(evolveA[i]);
                                list.push(evolveA[i]);
                            }

                            if (typeof chain.evolves_to[0].evolves_to[0] !== 'undefined') {
                                const evolveB = await axios({url: `https://pokeapi.co/api/v2/pokemon/${chain.evolves_to[0].evolves_to[0].species.name}`});

                                const res = await axios(evolveB.data.species.url);
                                const des = res.data.flavor_text_entries.filter(el => el.language.name === 'es');
                                evolveB.data.species = des[0].flavor_text;

                                list.push(evolveB);

                            }
                        }

                        //console.log(list);

                        setEvolveTo(list);
                        
                    } catch (err) {
                        console.log(err);
                    }
                }

                if (evolves_from_species !== null) {
                    getEvolveFrom();
                };
                
                getEvolveTo();
                setPokemon(
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
                        description: des[0].flavor_text,
                        hp: stats[0].base_stat,
                        attack: stats[1].base_stat,
                        defense: stats[2].base_stat,
                        special_attack: stats[3].base_stat,
                        special_defense: stats[4].base_stat,
                        speed: stats[5].base_stat,
                    }
                )  
                
            } catch (err) {
                console.log(err);
            } 
        }

        getPokemon();
    
    }, [nameID]);

    //console.log(pokemon.typeBase);  

  return (
    <main className='detail'>
        <div className="routes">
            <ul>
                <li>
                    <Link to={'/'}>Home <MdChevronRight/></Link>
                </li>
                <li>
                    {nameID}
                </li>
            </ul>
        </div>

        <Slideshow>
            
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
            description = {pokemon.description}
            hp={pokemon.hp}
            atk={pokemon.attack}
            def={pokemon.defense}
            satk={pokemon.special_attack}
            sdef={pokemon.special_defense}
            spd={pokemon.speed}
            />

            { evolveTo ? evolveTo.map(({data}) => {
                if (evolveFrom) {
                    if(data.name !== nameID && data.name !== evolveFrom.name) {
                        return <DetailPokemon
                        key={data.name}
                        name={data.name} 
                        order={data.order} 
                        sprite={data.sprites.other['official-artwork'].front_default ? data.sprites.other['official-artwork'].front_default : unknow} 
                        weight={data.weight} 
                        height={data.height} 
                        typeBase={data.types[0].type.name}
                        typeSec={data.types[1] ? data.types[1].type.name : null}
                        moveBase={data.moves[0] ? data.moves[0].move.name : null}
                        moveSec={data.moves[1] ? data.moves[1].move.name : null}
                        description={data.species}
                        hp={data.stats[0].base_stat}
                        atk={data.stats[1].base_stat}
                        def={data.stats[2].base_stat}
                        satk={data.stats[3].base_stat}
                        sdef={data.stats[4].base_stat}
                        spd={data.stats[5].base_stat}
                        />
                    }
                } else {
                    if(data.name !== nameID) {
                        return <DetailPokemon
                        key={data.name}
                        name={data.name} 
                        order={data.order} 
                        sprite={data.sprites.other['official-artwork'].front_default ? data.sprites.other['official-artwork'].front_default : unknow} 
                        weight={data.weight} 
                        height={data.height} 
                        typeBase={data.types[0].type.name}
                        typeSec={data.types[1] ? data.types[1].type.name : null}
                        moveBase={data.moves[0] ? data.moves[0].move.name : null}
                        moveSec={data.moves[1] ? data.moves[1].move.name : null}
                        description={data.species}
                        hp={data.stats[0].base_stat}
                        atk={data.stats[1].base_stat}
                        def={data.stats[2].base_stat}
                        satk={data.stats[3].base_stat}
                        sdef={data.stats[4].base_stat}
                        spd={data.stats[5].base_stat}
                        />
                    }
                }
            }) : null }

            { evolveFrom ?  
                <DetailPokemon
                name={evolveFrom.name} 
                order={evolveFrom.order} 
                sprite={evolveFrom.sprite} 
                weight={evolveFrom.weight} 
                height={evolveFrom.height} 
                typeBase={evolveFrom.typeBase}
                typeSec={evolveFrom.typeSec}
                moveBase={evolveFrom.moveBase}
                moveSec={evolveFrom.moveSec}
                description = {evolveFrom.description}
                hp={evolveFrom.hp}
                atk={evolveFrom.attack}
                def={evolveFrom.defense}
                satk={evolveFrom.special_attack}
                sdef={evolveFrom.special_defense}
                spd={evolveFrom.speed}
                />
             : null }

        </Slideshow>

        <div>
            <Related type={pokemon.typeBase}/>
        </div>
        
    </main>
  )
}

export default Detail;