import React from 'react';
//import axios from 'axios';
import { Link } from 'react-router-dom';

const CartPokemon = ({order, name, sprites}) => {

    /* const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        
        const getPokemon = () => {
            axios({url: 'https://pokeapi.co/api/v2/pokemon/bulbasaur'})
            .then(response => {

                let {order, name, sprites} = response.data;
                
                return setPokemon({order, name, img: sprites.other['official-artwork'].front_default})
            })
        }

        getPokemon()
    
    }, [setPokemon]); */

    //console.log(pokemon);

  return (
    <Link to={'/detail'}>
        <div className='cart-pokemon'>
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