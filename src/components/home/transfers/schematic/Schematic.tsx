import React from 'react'
import './Schematic.css'

export function Schematic({
                              gkPositions,
                              defPositions,
                              midPositions,
                              attPositions,
                              playerRender
                          }: {
    gkPositions: number[], defPositions: number[], midPositions: number[], attPositions: number[],
    playerRender: ({position}: { position: number }) => JSX.Element
}) {
    const playersSection = [
        {id: 'gk-div', positions: gkPositions},
        {id: 'def-div', positions: defPositions},
        {id: 'mid-div', positions: midPositions},
        {id: 'att-div', positions: attPositions}
    ]

    return (
        <div id={'schematic-main-div'}>
            {
                playersSection.map(section => {
                    return (
                        <div id={section.id}>
                            {
                                section.positions.map(position =>
                                    playerRender({position: position}))
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}