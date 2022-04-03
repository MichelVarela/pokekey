import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { MdEast, MdSearch, MdExitToApp } from 'react-icons/md';

const DropdownMenu = ({ dropdown, setDropdown }) => {

  const [search, setSearch] = useState(undefined);
  const [filter, setFilter] = useState([]);
  const [types, setTypes] = useState([]);
  const [generations, setGenerations] = useState([]);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const searching = async () => {

    const res = await axios ('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1126');
    const result = res.data.results.filter(el => {
      if (el.name.includes(search)) {
        return el;
      }
    });

    if (result.length !== 0) {
      return setFilter(result); 
    } else {
      return setFilter('no hay coincidencias');
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    searching();
  }

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

    const getGenerations = async () => {
      try {
        const res = await axios({url: 'https://pokeapi.co/api/v2/generation'});
        const {data} = res;

        const dataURL = await axios.all(data.results.map(({url}) => axios(url)));
        //console.log(dataURL);
        setGenerations(dataURL);

      } catch (err) {
        console.log(err);
      }
    }

    let dropdown = document.querySelectorAll('.dropdown');
    
    dropdown.forEach(el => {
      el.addEventListener('click', () => {
        
        let list = el.querySelector('ul');
        
        if(!list.style.maxHeight){
          list.style.marginTop = '15px';
          list.style.maxHeight = `${list.scrollHeight}px`;
          list.style.opacity = 1; 
        }else{
          list.style.marginTop = null;
          list.style.maxHeight = null;
          list.style.opacity = null;    
        }

      })
    })

    getTypes();
    getGenerations();
  
  }, []);

  console.log(filter);

  return (
    <div className={ dropdown ? 'dropdown-menu dropdown-menu-active' : 'dropdown-menu' }>
        <div className="icon-dropdown-close" onClick={ () => setDropdown(false) }>
            <MdExitToApp/>
        </div>
        <form onSubmit={ handleSubmit }>
          <div className="content-search"><input placeholder='Search...' onChange={handleChange}/> <button className="icon-search" onClick={ searching }><MdSearch/></button></div>
        </form>
        <ul>
            <li><Link to={'/'}>HOME</Link></li>
            <li className='dropdown'><div>TYPES <div className="arrow-right"><MdEast/></div></div>
              <ul className='dropdown-content-types'>
                {types.map(type => <li key={type.name}><Link to={`/type/${type.name}`}>{type.name}</Link></li>)}
              </ul>
            </li>
            <li className='dropdown'><div>GENERATIONS <div className="arrow-right"><MdEast/></div></div>
              <ul className='dropdown-content-generations'>
                {generations.map(generation => <li key={generation.data.id}><Link to={`/generation/${generation.data.id}`}>{generation.data.main_region.name}</Link></li>)}       
              </ul>
            </li>
        </ul>
    </div>
  );
};

export default DropdownMenu;
