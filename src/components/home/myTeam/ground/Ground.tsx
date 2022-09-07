import React from 'react'
import './Ground.css'
import inactiveCloth from './assets/cloth-inactive.svg'
import addIcon from './assets/add-icon.svg'
import activeCloth from './assets/cloth-active.svg'
import deleteIcon from './assets/delete-icon.svg'
import {myTeamApiResponse, player} from "../../../../GlobalVariables";
import RemovePlayerAlert from "../removePlayerAlert/RemovePlayerAlert";

function Ground() {
    const [players, setPlayers] = React.useState(getInitialState())
    const [currentPlayer, setCurrentPlayer] = React.useState(undefined as player | undefined)

    const gkPositions = [1, 2]
    const defPositions = [3, 4, 5, 6, 7]
    const midPositions = [8, 9, 10, 11, 12]
    const attPositions = [13, 14, 15]

    function getInitialState() {
        return myTeamApiResponse.data.players_list.reduce((map: {
            [key: number]: player
        }, obj) => {
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

    function getClothDiv(isActiveVisible: 'hidden' | 'visible', player: player) {
        function getToggleOfVisibility() {
            if (isActiveVisible === 'hidden')
                return 'visible'
            else
                return 'hidden'
        }

        return (
            <div className={isActiveVisible === 'visible' ? 'player-active-div' : 'player-inactive-div'}>
                <img className={'delete-icon'} style={{visibility: isActiveVisible}} src={deleteIcon}
                     alt={'active cloth'} onClick={() => {
                    delete players[player.location_in_ui]
                    setPlayers({...players})
                    setCurrentPlayer(player)
                }}/>
                <img className={'inactive-cloth'} style={{visibility: getToggleOfVisibility()}} src={inactiveCloth}
                     alt={'inactive cloth'}/>
                <img className={'active-cloth'} style={{visibility: isActiveVisible}} src={activeCloth}
                     alt={'active cloth'}/>
                <img className={'add-icon'} style={{visibility: getToggleOfVisibility()}} src={addIcon}
                     alt={'inactive cloth'}/>
                <div className={'player-name'}
                     style={{visibility: isActiveVisible}}>{player ? player.web_name : ''}</div>
                <div className={'power'}
                     style={{visibility: isActiveVisible}}>{player ? player.player_week_log.player_total_points : 0}</div>
            </div>
        )
    }

    function getPlayersDivs(positions: number[]) {
        return positions.map((position) => {
            return (
                players[position] ? getClothDiv('visible', players[position]) : getClothDiv('hidden', players[position])
            )
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
            <RemovePlayerAlert player={currentPlayer}/>
        </div>
    )
}

export default Ground