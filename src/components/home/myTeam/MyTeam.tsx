import {Ground, selectedPositionState} from "./ground/Ground";
import React, {useEffect, useState} from "react";
import {RemainingPlayer, usedPlayerState} from "./remainingPlayer/RemainingPlayer";
import {RemainingMoney, remainingMoneyState} from "./remainingMoney/RemainingMoney";
import MiddleTabBar from "./middleTabBar/MiddleTabBar";
import ChoosePlayer from "./choosePlayer/ChoosePlayer";
import DateBax from "./dateBox/DateBox";
import axios from "axios";
import {fantasyTeamApiResponseType, players, serverUrl} from "../../../GlobalVariables";
import {atom, useRecoilState} from "recoil";
import MyPlayersList from "./myPlayersList/MyPlayersList";
import {isDeleteConfirmClickedState} from "./removePlayerModal/RemovePlayerModal";
import {modalsDisplayState} from "../../../App";

export const playersState = atom<players>({
    key: 'playersState',
    default: {}
})

export function MyTeam({showingTab}: { showingTab: 'schematic' | 'list' }) {
    const [fantasyTeamApiResponse, setFantasyTeamApiResponse] = useState<fantasyTeamApiResponseType | undefined>(undefined);
    const [players, setPlayers] = useRecoilState(playersState)
    const [, setRemainingMoney] = useRecoilState(remainingMoneyState)
    const [, setUsedPlayer] = useRecoilState(usedPlayerState)

    const [selectedPosition, setSelectedPosition] = useRecoilState(selectedPositionState)
    const [isDeleteConfirmClicked, setIsDeleteConfirmClicked] = useRecoilState(isDeleteConfirmClickedState)
    const [, setModalDisplayState] = useRecoilState(modalsDisplayState)

    useEffect(() => updateInfoOfGame(), [])

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
                    },
                    headers: {
                        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1haGRpIiwiaXNfdmVyaWZpZWQiOnRydWUsImlhdCI6MTY2Mjg1OTM1MiwiZXhwIjoxNjYyOTQ1NzUyfQ.p8lDPFIkjphXmQTQN0jSlHjPpnag7u3y4ZLBkpgOOHE'
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

    const gkPositions = [1, 2]
    const defPositions = [3, 4, 5, 6, 7]
    const midPositions = [8, 9, 10, 11, 12]
    const attPositions = [13, 14, 15]

    useEffect(() => {
        if (!fantasyTeamApiResponse)
            return

        setPlayers(convertFantasyTeamApiResponse(fantasyTeamApiResponse))
        setRemainingMoney(fantasyTeamApiResponse.data.fantasyteam.money_remaining)
        setUsedPlayer(fantasyTeamApiResponse.data.fantasyteam.number_of_player)
    }, [fantasyTeamApiResponse])

    const updateInfoOfGame = () => {
        axios.get(`${serverUrl}/fantasyteam`, {
            headers: {
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1haGRpIiwiaXNfdmVyaWZpZWQiOnRydWUsImlhdCI6MTY2Mjg1OTM1MiwiZXhwIjoxNjYyOTQ1NzUyfQ.p8lDPFIkjphXmQTQN0jSlHjPpnag7u3y4ZLBkpgOOHE'
            }
        })
            .then(
                res => setFantasyTeamApiResponse(res.data),
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

    function selectPosition(position: number) {
        return () => {
            setSelectedPosition(position)
        }
    }

    function deselectPosition() {
        setSelectedPosition(undefined)
    }

    return (
        <div>
            <RemainingPlayer/>
            <RemainingMoney/>
            <MiddleTabBar/>
            <ChoosePlayer/>
            <DateBax/>

            {showingTab === 'schematic' ?
                <Ground selectPosition={selectPosition}
                        deselectPosition={deselectPosition} gkPositions={gkPositions} defPositions={defPositions}
                        midPositions={midPositions} attPositions={attPositions}/> :
                // so showingTab === 'list'
                <MyPlayersList selectPosition={selectPosition}
                               deselectPosition={deselectPosition} gkPositions={gkPositions} defPositions={defPositions}
                               midPositions={midPositions} attPositions={attPositions}/>}
        </div>
    )
}