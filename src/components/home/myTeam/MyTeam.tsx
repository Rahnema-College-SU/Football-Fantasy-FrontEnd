import {Ground, selectedPositionState} from "./ground/Ground";
import React, {useEffect, useState} from "react";
import {RemainingPlayer, usedPlayerState} from "./remainingPlayer/RemainingPlayer";
import {RemainingMoney, remainingMoneyState} from "./remainingMoney/RemainingMoney";
import MiddleTabBar from "./middleTabBar/MiddleTabBar";
import ChoosePlayer from "./choosePlayer/ChoosePlayer";
import DateBax, {dateState, dateType} from "./dateBox/DateBox";
import axios from "axios";
import {
    errorMessages,
    fantasyTeamApiResponseType,
    onAxiosError,
    onAxiosSuccess,
    players,
    serverUrl,
    token
} from "../../../GlobalVariables";
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import MyPlayersList from "./myPlayersList/MyPlayersList";
import {isDeleteConfirmClickedState, removePlayerModalDisplayState} from "./removePlayerModal/RemovePlayerModal";

export const myPlayersState = atom<players>({
    key: 'myPlayersState',
    default: {}
})

export function MyTeam({showingTab}: { showingTab: 'schematic' | 'list' }) {
    const [fantasyTeamApiResponse, setFantasyTeamApiResponse] = useState<fantasyTeamApiResponseType | undefined>(undefined);
    const [myPlayers, setMyPlayers] = useRecoilState(myPlayersState)
    const setRemainingMoney = useSetRecoilState(remainingMoneyState)
    const setUsedPlayer = useSetRecoilState(usedPlayerState)
    const [date, setDate] = useRecoilState(dateState)

    const [selectedPosition, setSelectedPosition] = useRecoilState(selectedPositionState)
    const isDeleteConfirmClicked = useRecoilValue(isDeleteConfirmClickedState)
    const setRemovePlayerModalDisplay = useSetRecoilState(removePlayerModalDisplayState)

    useEffect(() => updateInfoOfGame(), [])

    // for delete confirmation modal
    useEffect(() => {
        setRemovePlayerModalDisplay('none')

        if (!selectedPosition || !myPlayers[selectedPosition])
            return


        if (isDeleteConfirmClicked) {
            // axios(
            //     {
            //         method: 'put',
            //         url: serverUrl + '/fantasyteam/player',
            //         data: {
            //             player_id: myPlayers[selectedPosition].id
            //         },
            //         headers: {
            //             'x-access-token': token
            //         }
            //     }
            // )
            //     .then(
            //         res => {
            //             if (res.data.success) {
            //                 updateInfoOfGame()
            //             } else {
            //                 console.log(res)
            //                 //TODO: create custom alert
            //                 alert('خطا در حذف بازیکن')
            //             }
            //         },
            //         error => {
            //             console.log(error)
            //             //    TODO: create custom alert
            //             alert('خطا در حذف بازیکن')
            //         }
            //     )
        }
    }, [isDeleteConfirmClicked])

    async function getDate(): Promise<dateType> {
        return axios.get(`${serverUrl}/weekInf`).then(
            res => {
                return onAxiosSuccess({
                    res: res, errorMessage: errorMessages.dateError, returnValues: {
                        success: res.data.data,
                        error: res.data.error
                    }
                })
            },
            error => onAxiosError({error: error, errorMessage: errorMessages.dateError})
        )
    }

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
                'x-access-token': token
            }
        })
            .then(
                res =>
                    onAxiosSuccess({
                        res: res,
                        errorMessage: errorMessages.loadTeamError,
                        onSuccess: () => setFantasyTeamApiResponse(res.data)
                    })
                ,
                error => onAxiosError({error: error, errorMessage: errorMessages.loadTeamError})
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
            <DateBax getDate={getDate}/>

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