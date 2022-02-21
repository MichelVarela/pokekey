import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { MdEast, MdSearch } from 'react-icons/md';

// icons
import BurguerClose from '../../icons/burguerClose.svg';

const DropdownMenu = ({ dropdown, setDropdown }) => {

  const [types, setTypes] = useState([]);
  //const [generations, setGenerations] = useState([]);

  useEffect(() => {
    
    const getTypes = () => {
      try {
        axios ({url: 'https://pokeapi.co/api/v2/type'})
        .then(({data}) => {
          setTypes(data.results);
        })
        
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

    /* const getGenerations = async () => {
      try {
        await axios ({url: 'https://pokeapi.co/api/v2/generation'})
        .then(response => {

          const getUrls = response.data.results.map(direct => { // recibo las rutas de las generations
            return direct.url;
          });

          console.log(getUrls);

          const regions = getUrls.map(async urls => { // realizo un get sobre las rutas recibidas y pusheo main_region.name al array regions linea 30
            return await axios ({url: urls})
            .then(response => response.data.main_region.name)
          })

          const regions = axios.all(getUrls.map(async url => await axios ({url}).then(async result => await result.data)))

          console.log(regions.length);

          setGenerations(regions); // generations contiene el array de regions

        })
        
      } catch (err) {
        console.log(err);
      }
    } */

    getTypes();
    //getGenerations();
  
  }, [setTypes]);

  //console.log(generations.length) 

  return (
    <div className={ dropdown ? 'dropdown-menu dropdown-menu-active' : 'dropdown-menu' }>
        <div className="icon-dropdown-close" onClick={ () => setDropdown(false) }>
            <img src={BurguerClose} alt="burguer-close" />
        </div>
        <div className="content-search"><input placeholder='Search...'/> <div className="icon-search"><MdSearch/></div></div>
        <ul>
            <li><Link to={'/'}>HOME</Link></li>
            <li className='dropdown'><div>TYPES <div className="arrow-right"><MdEast/></div></div>
              <ul className='dropdown-content-types'>
                {types.map(type => <li key={type.name}><Link to={`/type/${type.name}`}>{type.name}</Link></li>)}
              </ul>
            </li>
            <li className='dropdown'><div>GENERATIONS <div className="arrow-right"><MdEast/></div></div>
              <ul className='dropdown-content-generations'>
                <li>
                  <Link to={'#'}>kanto</Link>
                </li>
                <li>
                  <Link to={'#'}>johto</Link>
                </li>
                <li>
                  <Link to={'#'}>hoenn</Link>
                </li>
                <li>
                  <Link to={'#'}>sinnoh</Link>
                </li>
                <li>
                  <Link to={'#'}>unova</Link>
                </li>
                <li>
                  <Link to={'#'}>kalos</Link>
                </li>
                <li>
                  <Link to={'#'}>alola</Link>
                </li>
                <li>
                  <Link to={'#'}>galar</Link>
                </li>       
              </ul>
            </li>
        </ul>
    </div>
  );
};

export default DropdownMenu;
