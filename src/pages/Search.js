import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// components
import CartPokemon from '../components/Layouts/CartPokemon';
import Pagination from '../components/Layouts/Pagination';

// images 
import unknow from '../images/unknow.png';
import search from '../images/search.svg';

//mui
import { CircularProgress } from '@mui/material';

const Search = () => {

  const {query} = useParams();

  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // page initialized to one
  const [postsPerPage] = useState(20); // pokemons per page

  useEffect(() => {

    const searching = async () => {

      const res = await axios(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126`);
      const result = res.data.results.filter(el => {
        if (el.name.toLowerCase().includes(query.toLowerCase().trim())) {
          return el;
        }
      });

      console.log(result);
  
      if (result.length !== 0) {

        const res = await axios.all(result.map(({url}) => axios(url)));
        setFilter(res); 
        setLoading(true);

        

      } else {
        setFilter('sorry');
        setLoading(true);
      }
    }

    setLoading(false);
    setCurrentPage(1); // cada  vez que cambie de vista que la page actual vuelva a 1
  
    searching();
    
  }, [query]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage; // paginas por cant de elementos a visualizar
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPokemon = filter.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <main className='search'>

      {
        loading !== false ?
        <>
          {
            filter === 'sorry' ? 
            <>
            <h2> Ups! No encontramos resultados</h2>
            <div className="content">
              <img src={search} alt="pikachu-search" className='pikachu-search'/>
            </div>
            </> : 
            <>
            <div className="routes">
              <ul>
                <li>Resultados de busqueda</li>
              </ul>
            </div>
            <div className="content-pokemon">
              {currentPokemon.map(({data}) => (
                  <CartPokemon key={data.name} id={data.id} order={data.order} name={data.name} sprites={data.sprites.other['official-artwork'].front_default ? data.sprites.other['official-artwork'].front_default : unknow} type={data.types[0].type.name}/> 
              ))}
            </div>

            <Pagination postsPerPage={postsPerPage} totalPosts={filter.length} paginate={paginate} selected={currentPage} />
            </>
          }
        </> :
        <div className="content-progress">
          <CircularProgress color='success'/> 
        </div> 
      }
        
    </main>
  )
}

export default Search;