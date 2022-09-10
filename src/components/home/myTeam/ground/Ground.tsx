import React, {useEffect} from 'react'
import './Ground.css'
import {player, players, serverUrl} from "../../../../GlobalVariables";
import addIcon from './assets/add-icon.svg'
import deleteIcon from './assets/delete-icon.svg'
import activeCloth from './assets/active-cloth.svg'
import inactiveCloth from './assets/inactive-cloth.svg'
import selectedCloth from './assets/selected-cloth.svg'
import axios from "axios";
import {atom, useRecoilState} from "recoil";
import {modalsDisplayState} from "../../../../App";
import {isDeleteConfirmClickedState} from "../removePlayerModal/RemovePlayerModal";

export const selectedPositionState = atom<number | undefined>({
    key: 'selectedPositionState',
    default: undefined
})

export const playersState = atom<players>({
    key: 'playersState',
    default: {}
})

export function Ground({updateInfoOfGame}: { updateInfoOfGame: () => void }) {
    const [players] = useRecoilState(playersState)
    const [selectedPosition, setSelectedPosition] = useRecoilState(selectedPositionState)
    const [, setModalDisplayState] = useRecoilState(modalsDisplayState)
    const [isDeleteConfirmClicked, setIsDeleteConfirmClicked] = useRecoilState(isDeleteConfirmClickedState)

    const gkPositions = [1, 2]
    const defPositions = [3, 4, 5, 6, 7]
    const midPositions = [8, 9, 10, 11, 12]
    const attPositions = [13, 14, 15]

    // for delete confirmation modal
    useEffect(() => {
        if (!selectedPosition || !players[selectedPosition]) {
            setIsDeleteConfirmClicked(false)
            setModalDisplayState('none')
            return
        }

        if (isDeleteConfirmClicked) {
            axios(
                {
                    method: 'put',
                    url: serverUrl + '/fantasyteam/player',
                    data: {
                        player_id: players[selectedPosition].id
                    }
                }
            )
                .then(
                    res => {
                        if (res.data.success) {
                            updateInfoOfGame()
                        } else {
                            console.log(res)
                            //TODO: create custom alert
                            alert('خطا در حذف بازیکن')
                        }
                    },
                    error => {
                        console.log(error)
                        //    TODO: create custom alert
                        alert('خطا در حذف بازیکن')
                    }
                )
            setIsDeleteConfirmClicked(false)
            setModalDisplayState('none')
        }
    }, [isDeleteConfirmClicked])

    function getClothDiv(position: number): JSX.Element {
        function getActiveClothDiv(player: player): JSX.Element {
            return (
                <div className='active-cloth-div'>
                    <img className={'delete-icon'} src={deleteIcon} alt={'active cloth'}
                         onClick={deletePlayer(player)}/>
                    <img className={'active-cloth'} src={activeCloth} alt={'active cloth'}
                         onClick={selectPosition(player.location_in_ui)}/>
                    <div className={'player-name'}>{player.web_name}</div>
                    <div className={'power'}>{player.player_week_log.player_total_points}</div>
                </div>
            )
        }

        function selectPosition(position: number) {
            return () => {
                setSelectedPosition(position)
            }
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
                    <img className={'delete-icon'} src={deleteIcon} alt={'active cloth'}
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
                    <img className={'delete-icon'} src={deleteIcon} alt={'active cloth'}
                         style={{visibility: 'hidden'}}/>
                    <img className={'selected-cloth'} src={selectedCloth} alt={'selected cloth'}
                         onClick={unselectPosition}/>
                    <div className={'player-name'} style={{visibility: 'hidden'}}>dummy</div>
                    <div className={'power'} style={{visibility: 'hidden'}}>0</div>
                </div>
            )
        }

        function unselectPosition() {
            setSelectedPosition(undefined)
        }

        function getSelectedActiveClothDiv(player: player): JSX.Element {
            return (
                <div className='selected-active-cloth-div'>
                    <img className={'delete-icon'} src={deleteIcon} alt={'active cloth'}
                         onClick={deletePlayer(player)}/>
                    <img className={'selected-cloth'} src={selectedCloth} alt={'selected cloth'}
                         onClick={unselectPosition}/>
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
        return positions.map((position) => {
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