import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { MdChevronRight } from 'react-icons/md';
import { useParams, Link } from 'react-router-dom';

// components
import CartPokemon from '../components/Layouts/CartPokemon';
import Pagination from '../components/Layouts/Pagination';

// images 
import unknow from '../images/unknow.png';

//mui
import { CircularProgress, LinearProgress } from '@mui/material';

const Generation = () => {

    const URLbase = 'https://pokeapi.co/api/v2/generation/';
    const {id} = useParams();

    const [loading, setLoading] = useState(false);
    const [pokemon, setPokemon] = useState({title: null, el: []});
    const [currentPage, setCurrentPage] = useState(1); // page initialized to one
    const [postsPerPage] = useState(20); // pokemons per page

    useEffect(() => {
      
        const getPokemon = async () => {

            try {
                const resA = await axios({url: `${URLbase}${id}`});
                const {data} = resA;

                const resB = await axios.all(data.pokemon_species.map(({url}) => axios(url))); 

                const dataURL = await axios.all(resB.map(({data}) => axios({url: data.varieties[0].pokemon.url})));
                
                const ordered = dataURL.sort((a,b) => a.data.order - b.data.order);
                setLoading(true);
                setPokemon({title: resA.data.main_region.name,el: ordered});

            } catch (err) {
                console.log(err);
            }
        }

        setLoading(false);
        setCurrentPage(1); // cada  vez que cambie de vista que la page actual vuelva a 1

        getPokemon();

    }, [id]);  
    
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage; // paginas por cant de elementos a visualizar
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPokemon = pokemon.el.slice(indexOfFirstPost, indexOfLastPost);

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
                </div>

                <div className="content-pokemon">
                    {currentPokemon.map(({data}) => (
                        <CartPokemon key={data.name} order={data.order} name={data.name} sprites={data.sprites.other['official-artwork'].front_default ? data.sprites.other['official-artwork'].front_default : unknow} type={data.types[0].type.name}/> 
                    ))}
                </div>

                <Pagination postsPerPage={postsPerPage} totalPosts={pokemon.el.length} paginate={paginate} selected={currentPage} />
            </> :
            <div className="content-progress">
                <CircularProgress color='success'/> 
            </div>
        }
         
    </main>
  )
}

export default Generation;