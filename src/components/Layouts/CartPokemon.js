import React from 'react';
//import axios from 'axios';
import { Link } from 'react-router-dom';

const CartPokemon = ({order, name, sprites, type}) => {

    

    //console.log(pokemon);

  return (
    <Link to={`/detail/${name}`}>
        <div className={`cart-pokemon ${type}`}>
            <h3>#{order}</h3>
            <img src={sprites} alt={name} />
            <div className="content-name">
                <h4>{name}</h4>
            </div>
        </div>
    </Link>
  )
}

export default CartPokemon