import React, { useEffect, useState } from 'react'
import './Card.scss'
import axios from 'axios';
const Card = ({ pokemon, onClick}) => {
    const types = pokemon.types;
    return (
        <div className="card" onClick={() => onClick(pokemon)}>
            <img src={pokemon.sprites['back_default']} alt="" />
            <h3>{pokemon.name}</h3>
            <div className="card_properties">
                {types.map(type => <span className='pokemon-type' type={type.type.name} key={type.type.name}>{type.type.name}</span>)}
            </div>
        </div>
    )
}

export default Card;