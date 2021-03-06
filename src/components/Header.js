import React, {useState} from 'react';
import {Link} from "react-router-dom";

// components
import DropdownMenu from './Layouts/DropdownMenu';

// images
import logo from '../images/logo.png';

// icons
import { MdExitToApp } from 'react-icons/md';

const Header = () => {

  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      <header>
        <div className="icon-burguer" onClick={ () => setDropdown(true)}>
          <MdExitToApp/>
        </div>
        <Link to={'/'}><img src={logo} alt="logo pokekey" /></Link>
      </header>

      <DropdownMenu dropdown={dropdown} setDropdown={setDropdown}/>
    </>
    );
};

export default Header;
