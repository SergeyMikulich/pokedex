import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import './assets/styles/main.scss';
import CardInfo from './components/CardInfo/CardInfo';
import CardList from './components/CardList/CardList';
import Header from './components/Header/Header';
import { CircularProgress } from '@mui/material';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [type, setType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [originalPokemons, setOriginalPokemons] = useState([]);
  const [page, setPage] = useState(12);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setSelectedPokemon(null);
      try {
        setIsLoading(true);

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${page}`);
        const originalPokemons = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const poke = await axios.get(pokemon.url);
            return poke.data;
          })
        );

        setOriginalPokemons(originalPokemons);

        if (!type) {
          setPokemons(originalPokemons);
        } else {
          fetchPokemonByType(type, originalPokemons);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchPokemonTypes = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type/');
        setPokemonTypes(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokemon types:', error);
      }
    };

    fetchData();
    fetchPokemonTypes();
  }, [page, type]);

  const loadMore = () => {
    setPage((page) => page + 12);
  };

  const handleCardSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleTypeSelect = (selectedType) => {
    if (!selectedType) {
      setPokemons(originalPokemons);
      setType('');
      return;
    }

    setType(selectedType.name);
  };

  const fetchPokemonByType = async (typeName, originalPokemons) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${typeName}`);
      const pokemons = response.data.pokemon.slice(0, page);
      const pokemonDetailsPromises = pokemons.map(async (pokemon) => {
        const detailsResponse = await axios.get(pokemon.pokemon.url);
        return detailsResponse.data;
      });
      const pokemonDetails = await Promise.all(pokemonDetailsPromises);
      setPokemons(pokemonDetails);
    } catch (error) {
      console.error(`Error fetching pokemons of type ${typeName}:`, error);
    }
  };

  const handleCloseCardInfo = () => {
    setSelectedPokemon(null);
  }

  return (
    <div className="section">
      <Header />
      <div className="container">
        {isLoading ? (<CircularProgress color="secondary" />) : ""}
        <CardList
          pokemons={pokemons}
          onCardSelect={handleCardSelect}
          isLoading={isLoading}
          loadMore={loadMore}
          pokemonTypes={pokemonTypes}
          onSelect={handleTypeSelect}
        />
        <CardInfo selectedPokemon={selectedPokemon} onClose={handleCloseCardInfo} />
      </div>
    </div>
  );
}

export default App;
