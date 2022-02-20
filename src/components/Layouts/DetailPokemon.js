import React from 'react';
import { MdKeyboardBackspace, MdVerticalSplit, MdAvTimer } from 'react-icons/md';

const DetailPokemon = () => {
  return (
    <div className="detail-pokemon">
        <div className="header">
            <h3><MdKeyboardBackspace/> bulbasaur</h3>
            <h4>#001</h4>
        </div>
        <figure>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" alt="bulbasaur" />
            <figcaption>grass</figcaption>
        </figure>
        <div className="detail">
            <h4>about</h4>

            <section>
                <article className="weight"> <MdAvTimer/> 8.5 kg</article>
                <article className="height"> <MdVerticalSplit/> 0,6 m</article>
                <article className="moves">
                    <ul>
                        <li>mega-punch</li>
                        <li>fire-punch</li>
                    </ul>
                </article>
            </section>

            <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque debitis porro eaque explicabo, qui possimus.</span>

            <h4>base stats</h4>

            <div className="stats">
                <ul className='types'>
                    <li>hp</li>
                    <li>atk</li>
                    <li>def</li>
                    <li>satk</li>
                    <li>sdef</li>
                    <li>spd</li>
                </ul>
                <ul className='values'>
                    <li>039</li>
                    <li>052</li>
                    <li>022</li>
                    <li>058</li>
                    <li>098</li>
                    <li>026</li>
                </ul>
            </div>
            
        </div>
    </div>
  )
}

export default DetailPokemon