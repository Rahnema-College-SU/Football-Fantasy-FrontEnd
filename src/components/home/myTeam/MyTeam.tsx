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

export const myPlayersState = atom<players>({
    key: 'myPlayersState',
    default: {}
})

export function MyTeam({showingTab}: { showingTab: 'schematic' | 'list' }) {
    const [fantasyTeamApiResponse, setFantasyTeamApiResponse] = useState<fantasyTeamApiResponseType | undefined>(undefined);
    const [myPlayers, setMyPlayers] = useRecoilState(myPlayersState)
    const [, setRemainingMoney] = useRecoilState(remainingMoneyState)
    const [, setUsedPlayer] = useRecoilState(usedPlayerState)

    const [selectedPosition, setSelectedPosition] = useRecoilState(selectedPositionState)
    const [isDeleteConfirmClicked, setIsDeleteConfirmClicked] = useRecoilState(isDeleteConfirmClickedState)
    const [, setModalDisplayState] = useRecoilState(modalsDisplayState)

    useEffect(() => updateInfoOfGame(), [])

    // for delete confirmation modal
    useEffect(() => {
        if (!selectedPosition || !myPlayers[selectedPosition]) {
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
                        player_id: myPlayers[selectedPosition].id
                    },
                    headers: {
                        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1haGRpMSIsImlzX3ZlcmlmaWVkIjp0cnVlLCJpYXQiOjE2NjI4ODY0MDEsImV4cCI6MTY2Mjk3MjgwMX0.ooVxqZKoAyG9NIQhcAR0Hdavyeiuzbgcg79rwZYW_rg'
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

    // changing fantasyTeamApiResponse
    useEffect(() => {
        if (!fantasyTeamApiResponse)
            return

        setMyPlayers(convertFantasyTeamApiResponse(fantasyTeamApiResponse))
        setRemainingMoney(fantasyTeamApiResponse.data.fantasyteam.money_remaining)
        setUsedPlayer(fantasyTeamApiResponse.data.fantasyteam.number_of_player)
    }, [fantasyTeamApiResponse])

    const updateInfoOfGame = () => {
        axios.get(`${serverUrl}/fantasyteam`, {
            headers: {
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1haGRpMSIsImlzX3ZlcmlmaWVkIjp0cnVlLCJpYXQiOjE2NjI4ODY0MDEsImV4cCI6MTY2Mjk3MjgwMX0.ooVxqZKoAyG9NIQhcAR0Hdavyeiuzbgcg79rwZYW_rg'
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