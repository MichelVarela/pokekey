import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { MdEast, MdSearch } from 'react-icons/md';

// icons
import BurguerClose from '../../icons/burguerClose.svg';

const DropdownMenu = ({ dropdown, setDropdown }) => {

  const [types, setTypes] = useState([]);

  useEffect(() => {
    
    const getTypes = async () => {
      try {
        const res = await axios ({url: 'https://pokeapi.co/api/v2/type'})
        const {data} = res;
        setTypes(data.results);
        
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
  
  }, [setTypes]);

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
