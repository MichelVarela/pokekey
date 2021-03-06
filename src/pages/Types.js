import React, {useState, useEffect} from 'react';
import { MdChevronRight } from 'react-icons/md';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

// components
import CartPokemon from '../components/Layouts/CartPokemon';
import Pagination from '../components/Layouts/Pagination';

// images 
import unknow from '../images/unknow.png';

//mui
import { CircularProgress } from '@mui/material';

const Types = () => {

    const URLbase = 'https://pokeapi.co/api/v2/type/';
    const {id} = useParams();

    const [loading, setLoading] = useState(false);
    const [pokemon, setPokemon] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // page initialized to one
    const [postsPerPage] = useState(20); // pokemons per page

    useEffect(() => {

        const getURL = async () => {

            try {
                const resA = await axios({url:`${URLbase}${id}`});
                const {data} = resA;
                
                const resB = await axios.all(data.pokemon.map(({pokemon}) => axios(pokemon.url)));
                setPokemon(resB);
                setLoading(true);
                
            } catch (err) {
                console.log(err);
            }
        }

        setLoading(false); // cada vez que cambie vuelve a false
        setCurrentPage(1); // cada  vez que cambie de vista que la page actual vuelva a 1

        getURL();
      
    }, [id])

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage; // paginas por cant de elementos a visualizar
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPokemon = pokemon.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    
  return (
    <main className='types'>
        {
            loading !== false ?
            <>
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
                    {currentPokemon.map(({data}) => (
                        <CartPokemon key={data.id} id={data.id} order={data.order} name={data.name} sprites={data.sprites.other['official-artwork'].front_default ? data.sprites.other['official-artwork'].front_default : unknow} type={data.types[0].type.name}/> 
                    ))}
                </div>

                <Pagination postsPerPage={postsPerPage} totalPosts={pokemon.length} paginate={paginate} selected={currentPage} />
            </> :
            <div className="content-progress">
                <CircularProgress color='success'/> 
            </div>
        }
         
    </main>
  )
}

export default Types;