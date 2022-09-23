import React, {useEffect, useRef} from 'react'
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
import {focusOnElementByRef, handleKeyboardEvent} from "../../../../global/Functions";

export const selectedPositionState = atom<number | undefined>({
    key: 'selectedPositionState',
    default: undefined
})

export function Ground({
                           selectPosition,
                           deselectPosition
                       }: {
    selectPosition: (position: number | undefined) => () => void,
    deselectPosition: () => void
}) {
    const myPlayers = useRecoilValue(myPlayersState)
    const selectedPosition = useRecoilValue(selectedPositionState)
    const setRemovePlayerModalDisplay = useSetRecoilState(removePlayerModalDisplayState)
    const setSelectedFilterItem = useSetRecoilState(selectedFilterItemState)
    const setSelectedPlayer = useSetRecoilState(selectedPlayerState)

    // for keyboard keys
    const selectedDivRef = useRef<HTMLDivElement | null>(null)
    const firstPosition = 1
    const lastPosition = 15

    useEffect(() => {
        if (selectedPosition === undefined)
            setSelectedPlayer(undefined)
        else {
            if (gkPositions.includes(selectedPosition))
                setSelectedFilterItem('GK')
            else if (defPositions.includes(selectedPosition))
                setSelectedFilterItem('DEF')
            else if (midPositions.includes(selectedPosition))
                setSelectedFilterItem('MID')
            else if (attPositions.includes(selectedPosition))
                setSelectedFilterItem('ATT')
        }
    }, [selectedPosition])

    function getClothDiv(position: number): JSX.Element {
        const keyboardKeys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'] as const

        function handleArrowKey(ArrowKey: typeof keyboardKeys[number]) {
            function getBeforeNextPositionArrays(position: number): [Array<number>, Array<number>] {
                // selected position must be between 1 and 15
                if (gkPositions.includes(position))
                    return [attPositions, defPositions]
                else if (defPositions.includes(position))
                    return [gkPositions, midPositions]
                else if (midPositions.includes(position))
                    return [defPositions, attPositions]
                else if (attPositions.includes(position))
                    return [midPositions, gkPositions]
                else
                    return [[], []]
            }

            return () => {
                if (selectedPosition) {
                    if (selectedPosition === firstPosition && ArrowKey === 'ArrowLeft')
                        selectPosition(lastPosition)()
                    else if (selectedPosition === lastPosition && ArrowKey === 'ArrowRight')
                        selectPosition(firstPosition)()
                    else if (ArrowKey === 'ArrowLeft')
                        selectPosition(selectedPosition - 1)()
                    else if (ArrowKey === 'ArrowRight')
                        selectPosition(selectedPosition + 1)()
                    else if (ArrowKey === 'ArrowDown')
                        selectPosition(getBeforeNextPositionArrays(selectedPosition)[1][0])()
                    else if (ArrowKey === 'ArrowUp')
                        selectPosition(getBeforeNextPositionArrays(selectedPosition)[0][0])()
                }
            }
        }

        function getActiveClothDiv(player: playerType): JSX.Element {
            return (
                <div className='cloth-div active-cloth-div'>
                    <img className={'delete-icon'} src={deleteIcon} alt={'delete icon'}
                         onClick={deletePlayer(player)}/>
                    <img className={'cloth active-cloth'} src={activeCloth} alt={'active cloth'}
                         onClick={selectPosition(player.location_in_ui)}/>
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
                <div className='cloth-div inactive-cloth-div'>
                    <img className={'delete-icon'} src={deleteIcon} alt={'delete icon'}
                         style={{visibility: 'hidden'}}/>
                    <img className={'cloth inactive-cloth'} src={inactiveCloth} alt={'inactive cloth'}
                         onClick={selectPosition(position)}/>
                    <img className={'add-icon'} src={addIcon} alt={'add icon'}
                         onClick={selectPosition(position)}/>
                    <div className={'player-name'} style={{visibility: 'hidden'}}>dummy</div>
                    <div className={'power'} style={{visibility: 'hidden'}}>۰</div>
                </div>
            )
        }

        function getSelectedInactiveClothDiv(): JSX.Element {
            return (
                <div className='cloth-div selected-inactive-cloth-div' ref={focusOnElementByRef(selectedDivRef)}
                     tabIndex={0}
                     onKeyUp={
                         handleKeyboardEvent(keyboardKeys, keyboardKeys.map(key => handleArrowKey(key))
                         )}>
                    <img className={'delete-icon'} src={deleteIcon} alt={'delete icon'}
                         style={{visibility: 'hidden'}}/>
                    <img className={'cloth selected-cloth'} src={selectedCloth} alt={'selected cloth'}
                         onClick={deselectPosition}/>
                    <div className={'player-name'} style={{visibility: 'hidden'}}>dummy</div>
                    <div className={'power'} style={{visibility: 'hidden'}}>۰</div>
                </div>
            )
        }

        function getSelectedActiveClothDiv(player: playerType): JSX.Element {
            return (
                <div className='cloth-div selected-active-cloth-div' ref={focusOnElementByRef(selectedDivRef)}
                     tabIndex={0}
                     onKeyUp={
                         handleKeyboardEvent([...keyboardKeys, 'Backspace'], [...keyboardKeys.map(key => handleArrowKey(key)), () => deletePlayer(player)()]
                         )}>
                    <img className={'delete-icon'} src={deleteIcon} alt={'delete icon'}
                         onClick={deletePlayer(player)}/>
                    <img className={'cloth selected-cloth'} src={selectedCloth} alt={'selected cloth'}
                         onClick={deselectPosition}/>
                    <div className={'player-name'}>{player.web_name}</div>
                    <div className={'power'}>{toFarsiNumber(player.player_week_log.player_total_points)}</div>
                </div>
            )
        }

        return (
            (selectedPosition && selectedPosition === position) ? (
                myPlayers[position] ? getSelectedActiveClothDiv(myPlayers[position]) : getSelectedInactiveClothDiv()
            ) : (
                myPlayers[position] ? getActiveClothDiv(myPlayers[position]) : getInactiveClothDiv(position)
            )
        )
    }

    function getPlayersDivs(positions: number[]) {
        return positions.map(position => {
            return getClothDiv(position)
        })
    }

    return (
        <div id={'ground-main-div'}>
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
    )
}