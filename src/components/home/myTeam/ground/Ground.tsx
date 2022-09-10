import React, {useEffect, useState} from 'react'
import './Ground.css'
import {fantasyTeamApiResponseType, serverUrl} from "../../../../GlobalVariables";
import addIcon from './assets/add-icon.svg'
import deleteIcon from './assets/delete-icon.svg'
import activeCloth from './assets/active-cloth.svg'
import inactiveCloth from './assets/inactive-cloth.svg'
import selectedCloth from './assets/selected-cloth.svg'
import axios from "axios";

function Ground() {
    type player = {
        id: number,
        web_name: string,
        position: string,
        player_week_log: {
            player_cost: number,
            player_total_points: number
        },
        location_in_ui: number
    }
    type players = {
        [key: number]: player
    }

    const [players, setPlayers] = useState<players>({})
    const [selectedPosition, setSelectedPosition] = useState<number | undefined>(undefined)
    // const [currentPlayer, setCurrentPlayer] = React.useState(undefined as player | undefined)

    const gkPositions = [1, 2]
    const defPositions = [3, 4, 5, 6, 7]
    const midPositions = [8, 9, 10, 11, 12]
    const attPositions = [13, 14, 15]

    useEffect(() => getTeamPlayers(), []
    )

    function getTeamPlayers() {
        axios.get(`${serverUrl}/fantasyteam`)
            .then(
                res => setPlayers(convertFantasyTeamApiResponse(res.data)),
                error => {
                    console.log(error)
                    //TODO: create custom alert
                    alert('خطا در دریافت اطّلاعات تیم')
                }
            )
    }

    function convertFantasyTeamApiResponse(apiResponse: fantasyTeamApiResponseType) {
        return apiResponse.data.players_list.reduce((map: players, obj) => {
            map[obj.location_in_ui] = {
                id: obj.id,
                web_name: obj.web_name,
                position: obj.position.short_name,
                player_week_log: {
                    player_cost: obj.player_week_log.player_cost / 10,
                    player_total_points: obj.player_week_log.player_total_points / 10
                },
                location_in_ui: obj.location_in_ui
            }

            return map
        }, {})
    }

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
                axios(
                    {
                        method: 'put',
                        url: serverUrl + '/fantasyteam/player',
                        data: {
                            player_id: player.id
                        }
                    }
                )
                    .then(
                        res => {
                            if (res.data.success) {
                                getTeamPlayers()
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
            {/*<RemovePlayerAlert player={currentPlayer}/>*/}
        </div>
    )
}

export default Ground


// function getClothDiv(player: player | undefined) {
//     function deletePlayer() {
//         if (!player)
//             return
//
//         delete players[player.location_in_ui]
//         setPlayers({...players})
//         // setCurrentPlayer(player)
//     }
//
//     function getVisibility(visibility: boolean) {
//         if (visibility)
//             return 'visible'
//         else
//             return 'hidden'
//     }
//
//     function selectPlayer() {
//         setSelectedPlayer(player)
//     }
//
//     function getPlayerUsingDefault(trueAppending: string, falseString: string): string {
//         return player ? `${player.status}${trueAppending}` : falseString
//     }
//
//     return (
//         <div className={player ? 'player-active-div' : 'player-inactive-div'}>
//             <img className={'delete-icon'} style={{
//                 visibility: getVisibility(player !== undefined && player.status === 'active')
//             }} src={deleteIcon} alt={'active cloth'} onClick={deletePlayer}/>
//             {/*<img className={'inactive-cloth'} style={{visibility: getVisibility(state === 'inactive')}}*/}
//             {/*     src={inactiveCloth}*/}
//             {/*     alt={'inactive cloth'}/>*/}
//             {/*<img className={'active-cloth'} style={{visibility: getVisibility(state === 'active')}}*/}
//             {/*     src={activeCloth}*/}
//             {/*     alt={'active cloth'}/>*/}
//             {/*<img className={'active-cloth'} style={{visibility: getVisibility(state === 'selected')}}*/}
//             {/*     src={selectedCloth}*/}
//             {/*     alt={'selected cloth'}/>*/}
//             <img className={getPlayerUsingDefault('-cloth', 'inactive-cloth')}
//                  src='./assets/inactive-cloth.svg'
//                  alt={getPlayerUsingDefault(' cloth', 'inactive cloth')}/>
//             <img className={'add-icon'}
//                  style={{visibility: getVisibility(player === undefined || player.status === 'inactive')}}
//                  src={addIcon} alt={'add icon'}/>
//             <div className={'player-name'}
//                  style={{visibility: getVisibility(player !== undefined && player.status === 'active')}}>{player ? player.web_name : ''}</div>
//             <div className={'power'}
//                  style={{visibility: getVisibility(player !== undefined && player.status === 'active')}}>{player ? player.player_week_log.player_total_points : 0}</div>
//         </div>
//     )
// }