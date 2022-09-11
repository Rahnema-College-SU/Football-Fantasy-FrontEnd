import React from 'react'
import './Ground.css'
import {player} from "../../../../GlobalVariables";
import addIcon from './assets/add-icon.svg'
import deleteIcon from './assets/delete-icon.svg'
import activeCloth from './assets/active-cloth.svg'
import inactiveCloth from './assets/inactive-cloth.svg'
import selectedCloth from './assets/selected-cloth.svg'
import {atom, useRecoilState} from "recoil";
import {modalsDisplayState} from "../../../../App";
import {playersState} from "../MyTeam";

export const selectedPositionState = atom<number | undefined>({
    key: 'selectedPositionState',
    default: undefined
})

export function Ground({
                           selectPosition,
                           deselectPosition,
                           gkPositions,
                           defPositions,
                           midPositions,
                           attPositions
                       }: {
    selectPosition: (position: number) => () => void,
    deselectPosition: () => void,
    gkPositions: number[],
    defPositions: number[],
    midPositions: number[],
    attPositions: number[]
}) {
    const [players] = useRecoilState(playersState)
    const [selectedPosition] = useRecoilState(selectedPositionState)
    const [, setModalDisplayState] = useRecoilState(modalsDisplayState)

    function getClothDiv(position: number): JSX.Element {
        function getActiveClothDiv(player: player): JSX.Element {
            return (
                <div className='active-cloth-div'>
                    <img className={'delete-icon'} src={deleteIcon} alt={'delete icon'}
                         onClick={deletePlayer(player)}/>
                    <img className={'active-cloth'} src={activeCloth} alt={'active cloth'}
                         onClick={selectPosition(player.location_in_ui)}/>
                    <div className={'player-name'}>{player.web_name}</div>
                    <div className={'power'}>{player.player_week_log.player_total_points}</div>
                </div>
            )
        }

        function deletePlayer(player: player) {
            return () => {
                selectPosition(player.location_in_ui)()
                setModalDisplayState('block')
            }
        }

        function getInactiveClothDiv(position: number): JSX.Element {
            return (
                <div className='inactive-cloth-div'>
                    <img className={'delete-icon'} src={deleteIcon} alt={'delete icon'}
                         style={{visibility: 'hidden'}}/>
                    <img className={'inactive-cloth'} src={inactiveCloth} alt={'inactive cloth'}
                         onClick={selectPosition(position)}/>
                    <img className={'add-icon'} src={addIcon} alt={'add icon'} onClick={selectPosition(position)}/>
                    <div className={'player-name'} style={{visibility: 'hidden'}}>dummy</div>
                    <div className={'power'} style={{visibility: 'hidden'}}>0</div>
                </div>
            )
        }

        function getSelectedInactiveClothDiv(): JSX.Element {
            return (
                <div className='selected-inactive-cloth-div'>
                    <img className={'delete-icon'} src={deleteIcon} alt={'delete icon'}
                         style={{visibility: 'hidden'}}/>
                    <img className={'selected-cloth'} src={selectedCloth} alt={'selected cloth'}
                         onClick={deselectPosition}/>
                    <div className={'player-name'} style={{visibility: 'hidden'}}>dummy</div>
                    <div className={'power'} style={{visibility: 'hidden'}}>0</div>
                </div>
            )
        }

        function getSelectedActiveClothDiv(player: player): JSX.Element {
            return (
                <div className='selected-active-cloth-div'>
                    <img className={'delete-icon'} src={deleteIcon} alt={'delete icon'}
                         onClick={deletePlayer(player)}/>
                    <img className={'selected-cloth'} src={selectedCloth} alt={'selected cloth'}
                         onClick={deselectPosition}/>
                    <div className={'player-name'}>{player.web_name}</div>
                    <div className={'power'}>{player.player_week_log.player_total_points}</div>
                </div>
            )
        }

        return (
            <div className={'cloth-div'}>
                {
                    (selectedPosition && selectedPosition === position) ? (
                        players[position] ? getSelectedActiveClothDiv(players[position]) : getSelectedInactiveClothDiv()
                    ) : (
                        players[position] ? getActiveClothDiv(players[position]) : getInactiveClothDiv(position)
                    )
                }
            </div>
        )
    }

    function getPlayersDivs(positions: number[]) {
        return positions.map(position => {
            return getClothDiv(position)
        })
    }

    return (
        <div id={'main-div-container'}>
            <div id={'main-div'}>
                <div id={'gk-div'}>
                    {getPlayersDivs(gkPositions)}
                </div>
                <div id={'def-div'}>
                    {getPlayersDivs(defPositions)}
                </div>
                <div id={'mid-div'}>
                    {getPlayersDivs(midPositions)}
                </div>
                <div id={'att-div'}>
                    {getPlayersDivs(attPositions)}
                </div>
            </div>
        </div>
    )
}