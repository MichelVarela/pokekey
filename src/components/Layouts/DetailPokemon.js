import React from 'react';
import { MdKeyboardBackspace, MdVerticalSplit, MdAvTimer } from 'react-icons/md';
import styled from 'styled-components';

// images
import pokeball from '../../images/Pokeball.svg';

const Stats = styled.li`
    position: relative;

    &:before {
        content: " ";
        position: absolute;
        top: 4px;
        left: 13px;
        width: ${props => props.width || 140}px;
        height: 10px;
        border-radius: 5px;
    }

    &:after {
        content: " ";
        position: absolute;
        top: 3px;
        right: -155px;
        width: 140px;
        height: 10px;
        border-radius: 5px;
        border: 1px solid #cdcdcd;
    }
`;

const DetailPokemon = ({name, order, sprite, weight, height, typeBase, typeSec, moveBase, moveSec, hp, atk, def, satk, sdef, spd}) => {

  return (
    <div className={`detail-pokemon ${typeBase}`}>
        <img src={pokeball} alt="background" className='background-ball'/>
        <div className="header">
            <h3><MdKeyboardBackspace/> {name}</h3>
            <h4>#{order}</h4>
        </div>
        <figure>
            <img src={sprite} alt={name} />
            <div className="types">
                <figcaption className={typeBase}>{typeBase}</figcaption>
                {typeSec !== null ? <figcaption className={typeSec}>{typeSec}</figcaption> : null}
            </div>
        </figure>
        <div className="detail">
            <h4>about</h4>

            <section>
                <article className="weight"> <MdAvTimer/> {weight} kg</article>
                <article className="height"> <MdVerticalSplit/> {height} m</article>
                <article className="moves">
                    <ul>
                        <li>{moveBase}</li>
                        {moveSec !== null ? <li>{moveSec}</li> : null}
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
                    <Stats width={hp}/>
                    <Stats width={atk}/>
                    <Stats width={def}/>
                    <Stats width={satk}/>
                    <Stats width={sdef}/>
                    <Stats width={spd}/>
                </ul>
            </div>
            
        </div>
    </div>
  )
}

export default DetailPokemon