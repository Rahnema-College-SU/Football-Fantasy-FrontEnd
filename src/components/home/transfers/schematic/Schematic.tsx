import React from 'react'
import './Schematic.css'
import {transfersAttPositions, transfersDefPositions, transfersGkPositions, transfersMidPositions} from "../../../../global/Variables";
import {atom} from "recoil";
import {TransfersSchematicPlayer} from "../../player/transfersPlayer/schematic/TransfersSchematicPlayer";

export const selectedPositionState = atom<number | undefined>({
    key: 'selectedPositionState',
    default: undefined
})

export function Schematic() {
    const playersSection = [
        {id: 'gk-div', positions: transfersGkPositions},
        {id: 'def-div', positions: transfersDefPositions},
        {id: 'mid-div', positions: transfersMidPositions},
        {id: 'att-div', positions: transfersAttPositions}
    ]

    function getPlayersDivs(positions: number[]) {
        return positions.map(position => <TransfersSchematicPlayer position={position}/>)
    }

    return (
        <div id={'schematic-main-div'}>
            {
                playersSection.map(section => {
                    return (
                        <div id={section.id}>
                            {getPlayersDivs(section.positions)}
                        </div>
                    )
                })
            }
        </div>
    )
}