import React from 'react';
import { Link } from 'react-router-dom';

const CartPokemon = ({id, order, name, sprites, type}) => {

  return (
    <Link to={`/detail/${id}`}>
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