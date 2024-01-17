import React, { useEffect, useRef } from 'react';
import './CardInfo.scss';
import { Icon } from '@iconify/react';

const CardInfo = ({ selectedPokemon, onClose }) => {
    return (
        <div className={selectedPokemon ? "card-info" : "hidden"}>
            <Icon className="close-btn" icon="mdi:close" onClick={onClose} />
            <img src={selectedPokemon?.sprites['back_default']} alt="" />
            <table>
                <thead>
                    {selectedPokemon?.name}
                </thead>
                <tbody>
                    <tr>
                        <th>Type</th>
                        <th>
                            {selectedPokemon?.types.map((type) => (
                                <span key={type.type.name}>{type.type.name} </span>
                            ))}
                        </th>

                    </tr>
                    <tr>
                        <th>Attack</th>
                        <th>{selectedPokemon?.stats.find((stat) => stat.stat.name === "attack")?.base_stat}</th>
                    </tr>
                    <tr>
                        <th>Defense</th>
                        <th>{selectedPokemon?.stats.find((stat) => stat.stat.name === "defense")?.base_stat}</th>
                    </tr>
                    <tr>
                        <th>HP</th>
                        <th>{selectedPokemon?.stats.find((stat) => stat.stat.name === "hp")?.base_stat}</th>
                    </tr>
                    <tr>
                        <th>SP Attack</th>
                        <th>{selectedPokemon?.stats.find((stat) => stat.stat.name === "special-attack")?.base_stat}</th>
                    </tr>
                    <tr>
                        <th>SP Defense</th>
                        <th>{selectedPokemon?.stats.find((stat) => stat.stat.name === "special-defense")?.base_stat}</th>
                    </tr>
                    <tr>
                        <th>Speed</th>
                        <th>{selectedPokemon?.stats.find((stat) => stat.stat.name === "speed")?.base_stat}</th>
                    </tr>
                    <tr>
                        <th>Weight</th>
                        <th>{selectedPokemon?.weight}</th>
                    </tr>
                    <tr>
                        <th>Total moves</th>
                        <th>{selectedPokemon?.moves.length}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CardInfo