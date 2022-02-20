import React from 'react';
import { Link } from 'react-router-dom';
import { MdChevronRight } from 'react-icons/md';

// components
import DetailPokemon from '../components/Layouts/DetailPokemon';

const Detail = () => {
  return (
    <main className='detail'>
        <div className="routes">
            <ul>
                <li>
                    <Link to={'/'}>Home <MdChevronRight/></Link>
                </li>
                <li>
                    Bulbausaur
                </li>
            </ul>
        </div>

        <DetailPokemon/>
    </main>
  )
}

export default Detail