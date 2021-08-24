import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function api() {
  const [pokemon, setPokemon] = useState([])
  const getPokemon = () => {
      axios.get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(res => {
        for (let i = 0; i < res.data.results.length; i++) {
          axios.get(res.data.results[i].url)
          .then(res => {
            setPokemon(prevState => [...prevState, res.data])
          })
        }
      })
    }

useEffect(getPokemon, []) 




    return (
        <div className="pokemonContainer">
            {pokemon.map((pokemon, index) => {
                return (
                    <div className="individualPokemonContainer" key={index}>
                        <h1>{pokemon.name}</h1>
                        <img src={pokemon.sprites.front_default} alt=""/>
                            <div className="individualPokemonStats">
                                <h3>Height: {pokemon.height}</h3>
                                <h3>Weight: {pokemon.weight}</h3>
                                <h3>Types: {pokemon.types.map(type => type.type.name)}</h3>                            
                            </div>
                    </div>
                )
            })}

        </div>
    )
}
