import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { MdChevronRight, MdOutlineFilterAlt } from 'react-icons/md';
import { useParams, Link } from 'react-router-dom';

// components
import CartPokemon from '../components/Layouts/CartPokemon';
import Pagination from '../components/Layouts/Pagination';

// images 
import unknow from '../images/unknow.png';

//mui
import { CircularProgress } from '@mui/material';

const Generation = () => {

    const URLbase = 'https://pokeapi.co/api/v2/generation/';
    const {id, type} = useParams();

    const [loading, setLoading] = useState(false);
    const [pokemon, setPokemon] = useState({title: null, el: []});

    const [currentPage, setCurrentPage] = useState(1); // page initialized to one
    const [postsPerPage] = useState(20); // pokemons per page

    const [types, setTypes] = useState([]);

    const [filter, setFilter] = useState(false);

    useEffect(() => {

        const getTypes = async () => {
            try {
              const res = await axios ({url: 'https://pokeapi.co/api/v2/type'});
              const {data} = res;
              setTypes(data.results);
              
            } catch (err) {
              console.log(err);
            }
        }
      
        const getPokemon = async () => {

            try {
                const resA = await axios({url: `${URLbase}${id}`});
                const {data} = resA;

                const resB = await axios.all(data.pokemon_species.map(({url}) => axios(url))); 

                const dataURL = await axios.all(resB.map(({data}) => axios({url: data.varieties[0].pokemon.url})));
                
                const ordered = dataURL.sort((a,b) => a.data.order - b.data.order);
                setPokemon({title: resA.data.main_region.name,el: ordered});
                setLoading(true);

            } catch (err) {
                console.log(err);
            }
        }

        setFilter(false)
        setLoading(false);
        setCurrentPage(1); // cada  vez que cambie de vista que la page actual vuelva a 1

        getTypes();
        getPokemon();

    }, [id, type]);

    // filter
    const filters = pokemon.el.filter(el => {

        if (el.data.types[0].type.name === type) {
            return el
        }

        if (el.data.types[1] && el.data.types[1].type.name === type) {
            return el
        }
    });

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage; // paginas por cant de elementos a visualizar
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPokemon = type ? filters.slice(indexOfFirstPost, indexOfLastPost) : pokemon.el.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <main className='generation'>
        {
            loading !== false ?
            <>
                <div className="routes">
                    <ul>
                        <li>
                            <Link to={'/'}>Home <MdChevronRight/></Link>
                        </li>
                        <li>
                            {pokemon.title}
                        </li>
                    </ul>

                    <div className="content-filter">
                        <div className="icon-filter" onClick={ () => setFilter(!filter) }><MdOutlineFilterAlt/></div>
                        {
                            filter === true ? 
                            <ul>
                                <Link to={`/generation/${id}`}><li className='sin-filtro'>Sin filtro</li></Link>
                                {types.map(type => <Link key={type.name} to={`/generation/${id}/${type.name}`}><li className={type.name}>{type.name}</li></Link>)}
                            </ul> :
                            null
                        }
                    </div>
                </div>

                <div className="content-pokemon">
                    {currentPokemon.map(({data}) => (
                        <CartPokemon key={data.name} id={data.id} order={data.order} name={data.name} sprites={data.sprites.other['official-artwork'].front_default ? data.sprites.other['official-artwork'].front_default : unknow} type={data.types[0].type.name}/> 
                    ))}
                </div>

                <Pagination postsPerPage={postsPerPage} totalPosts={type ? filters.length: pokemon.el.length} paginate={paginate} selected={currentPage} />
            </> :
            <div className="content-progress">
                <CircularProgress color='success'/> 
            </div>
        }
         
    </main>
  )
}

export default Generation;