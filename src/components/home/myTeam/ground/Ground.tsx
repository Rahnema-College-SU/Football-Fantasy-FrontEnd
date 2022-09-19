import React, {useEffect} from 'react'
import './Ground.css'
import {attPositions, defPositions, gkPositions, midPositions, toFarsiNumber} from "../../../../global/Variables";
import {playerType} from "../../../../global/Types";
import addIcon from './assets/add-icon.svg'
import deleteIcon from './assets/delete-icon.svg'
import activeCloth from './assets/active-cloth.svg'
import inactiveCloth from './assets/inactive-cloth.svg'
import selectedCloth from './assets/selected-cloth.svg'
import {atom, useRecoilValue, useSetRecoilState} from "recoil";
import {myPlayersState} from "../MyTeam";
import {removePlayerModalDisplayState} from "../removePlayerModal/RemovePlayerModal";
import {selectedFilterItemState, selectedPlayerState} from "../choosePlayerList/ChoosePlayerList";

export const selectedPositionState = atom<number | undefined>({
    key: 'selectedPositionState',
    default: undefined
})

export function Ground({
                           selectPosition,
                           deselectPosition
                       }: {
    selectPosition: (position: number | undefined) => () => void,
    deselectPosition: () => void,
    updateGameInfo: () => void
}) {
    const myPlayers = useRecoilValue(myPlayersState)
    const selectedPosition = useRecoilValue(selectedPositionState)
    const setRemovePlayerModalDisplay = useSetRecoilState(removePlayerModalDisplayState)
    const setSelectedFilterItem = useSetRecoilState(selectedFilterItemState)
    const setSelectedPlayer = useSetRecoilState(selectedPlayerState)

    useEffect(() => {
        if (selectedPosition === undefined)
            setSelectedPlayer(undefined)
    }, [selectedPosition])

    function getClothDiv(position: number): JSX.Element {
        function activeInactiveOnClick(position: number | undefined) {
            return () => {
                selectPosition(position)()

                if (position === undefined)
                    setSelectedPlayer(undefined)
                else if (gkPositions.includes(position))
                    setSelectedFilterItem('GK')
                else if (defPositions.includes(position))
                    setSelectedFilterItem('DEF')
                else if (midPositions.includes(position))
                    setSelectedFilterItem('MID')
                else if (attPositions.includes(position))
                    setSelectedFilterItem('ATT')
            }
        }

        function getActiveClothDiv(player: playerType): JSX.Element {
            return (
                <div className='active-cloth-div'>
                    <img className={'delete-icon'} src={deleteIcon} alt={'delete icon'}
                         onClick={deletePlayer(player)}/>
                    <img className={'active-cloth'} src={activeCloth} alt={'active cloth'}
                         onClick={activeInactiveOnClick(player.location_in_ui)}/>
                    <div className={'player-name'}>{player.web_name}</div>
                    <div className={'power'}>{toFarsiNumber(player.player_week_log.player_total_points)}</div>
                </div>
            )
        }

        function deletePlayer(player: playerType) {
            return () => {
                selectPosition(player.location_in_ui)()
                setSelectedPlayer(undefined)
                setRemovePlayerModalDisplay('block')
            }
        }

        function getInactiveClothDiv(position: number): JSX.Element {
            return (
                <div className='inactive-cloth-div'>
                    <img className={'delete-icon'} src={deleteIcon} alt={'delete icon'}
                         style={{visibility: 'hidden'}}/>
                    <img className={'inactive-cloth'} src={inactiveCloth} alt={'inactive cloth'}
                         onClick={activeInactiveOnClick(position)}/>
                    <img className={'add-icon'} src={addIcon} alt={'add icon'}
                         onClick={activeInactiveOnClick(position)}/>
                    <div className={'player-name'} style={{visibility: 'hidden'}}>dummy</div>
                    <div className={'power'} style={{visibility: 'hidden'}}>۰</div>
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
                    <div className={'power'} style={{visibility: 'hidden'}}>۰</div>
                </div>
            )
        }

        function getSelectedActiveClothDiv(player: playerType): JSX.Element {
            return (
                <div className='selected-active-cloth-div'>
                    <img className={'delete-icon'} src={deleteIcon} alt={'delete icon'}
                         onClick={deletePlayer(player)}/>
                    <img className={'selected-cloth'} src={selectedCloth} alt={'selected cloth'}
                         onClick={deselectPosition}/>
                    <div className={'player-name'}>{player.web_name}</div>
                    <div className={'power'}>{toFarsiNumber(player.player_week_log.player_total_points)}</div>
                </div>
            )
        }

        return (
            <div className={'cloth-div'}>
                {
                    (selectedPosition && selectedPosition === position) ? (
                        myPlayers[position] ? getSelectedActiveClothDiv(myPlayers[position]) : getSelectedInactiveClothDiv()
                    ) : (
                        myPlayers[position] ? getActiveClothDiv(myPlayers[position]) : getInactiveClothDiv(position)
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