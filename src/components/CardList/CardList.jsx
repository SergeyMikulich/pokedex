import React from 'react'
import Card from '../Card/Card'
import './CardList.scss';
import Button from '@mui/material/Button';
import ComboBox from '../ComboBox/ComboBox';

const CardList = ({ pokemons, onCardSelect, isLoading, loadMore, pokemonTypes, onSelect }) => {

    return (
        <div className="card-list">
            <ComboBox className="combo-box" list={pokemonTypes} onSelect={onSelect} />
            <div className="card-list-container">
                {pokemons && pokemons.map((pokemon) => <Card onClick={() => onCardSelect(pokemon)} key={pokemon.id} pokemon={pokemon} />)}
            </div>
            <div className="load-more">
                <Button className="button-load-more" variant="contained" color="primary" onClick={loadMore}>
                    {isLoading ? 'Loading...' : 'Load More'}
                </Button>
            </div>
        </div>

    )
}

export default CardList