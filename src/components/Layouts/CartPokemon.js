import React from 'react';
//import axios from 'axios';
import { Link } from 'react-router-dom';

const CartPokemon = () => {

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
            <h3>#001</h3>
            <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' alt='bulbasaur' />
            <div className="content-name">
                <h4>bulbasaur</h4>
            </div>
        </div>
    </Link>
  )
}

export default CartPokemon