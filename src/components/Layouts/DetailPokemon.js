import React from 'react';
import { MdKeyboardBackspace, MdVerticalSplit, MdAvTimer } from 'react-icons/md';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// images
import pokeball from '../../images/Pokeball.svg';

const Stats = styled.li`
    position: relative;

    &:before {
        content: " ";
        position: absolute;
        top: 4px;
        left: 13px;
        width: ${props => props.width > 142 ? 142 : props.width}px;
        height: 5px;
        border-radius: 5px;
    }

    &:after {
        content: " ";
        position: absolute;
        top: 3px;
        right: -155px;
        width: 140px;
        height: 5px;
        border-radius: 5px;
        border: 1px solid #cdcdcd;
    }
`;

const DetailPokemon = ({name, order, sprite, weight, height, typeBase, typeSec, moveBase, moveSec, description, hp, atk, def, satk, sdef, spd, evolve}) => {

    const navigate = useNavigate();

  return (
    <div className={`detail-pokemon ${typeBase}`}>
        <img src={pokeball} alt="background" className='background-ball'/>
        <div className="header">
            <div className="back">
                <MdKeyboardBackspace onClick={ () => navigate(-1) }/>
                <div>
                    <h3>{name}</h3>
                </div>
            </div>
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
                <article className="weight"> <MdAvTimer/> {(weight * 0.1).toFixed(1)} kg</article>
                <article className="height"> <MdVerticalSplit/> {(height * 0.1).toFixed(1)} m</article>
                <article className="moves">
                    <ul>
                        <li>{moveBase}</li>
                        {moveSec !== null ? <li>{moveSec}</li> : null}
                    </ul>
                </article>
            </section>

            <span>{description}</span>

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