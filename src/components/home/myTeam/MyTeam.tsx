import {Ground, selectedPositionState} from "./ground/Ground";
import React, {useEffect, useState} from "react";
import './MyTeam.css';
import {RemainingPlayer, usedPlayerState} from "./remainingPlayer/RemainingPlayer";
import {RemainingMoney, remainingMoneyState} from "./remainingMoney/RemainingMoney";
import MiddleTabBar from "./middleTabBar/MiddleTabBar";
import ChoosePlayer from "./choosePlayer/ChoosePlayer";
import DateBax, {dateState} from "./dateBox/DateBox";
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import MyPlayersList from "./myPlayersList/MyPlayersList";
import {isDeleteConfirmClickedState, removePlayerModalDisplayState} from "./removePlayerModal/RemovePlayerModal";
import {
    deletePlayerError,
    loadDateError,
    loadTeamError,
    onAxiosError,
    onAxiosSuccess,
    onBaseError,
    playerNotFoundError,
    selectedPlayerNotFoundError
} from "../../../global/Errors";
import {dateType, fantasyTeamApiResponseType, players} from "../../../global/Types";
import {axiosDeletePlayer, axiosFantasyTeam, axiosWeekInf} from "../../../global/ApiCalls";

export const myPlayersState = atom<players>({
    key: 'myPlayersState',
    default: {}
})

export function MyTeam({showingTab}: { showingTab: 'schematic' | 'list' }) {
    const [fantasyTeamApiResponse, setFantasyTeamApiResponse] = useState<fantasyTeamApiResponseType | undefined>(undefined);
    const [myPlayers, setMyPlayers] = useRecoilState(myPlayersState)
    const setRemainingMoney = useSetRecoilState(remainingMoneyState)
    const setUsedPlayer = useSetRecoilState(usedPlayerState)
    const setDate = useSetRecoilState(dateState)

    const [selectedPosition, setSelectedPosition] = useRecoilState(selectedPositionState)
    const isDeleteConfirmClicked = useRecoilValue(isDeleteConfirmClickedState)
    const setRemovePlayerModalDisplay = useSetRecoilState(removePlayerModalDisplayState)

    const gkPositions = [1, 2]
    const defPositions = [3, 4, 5, 6, 7]
    const midPositions = [8, 9, 10, 11, 12]
    const attPositions = [13, 14, 15]

    useEffect(() => updateGameInfo(), [])

    // for delete confirmation modal
    useEffect(() => {
        setRemovePlayerModalDisplay('none')

        if (isDeleteConfirmClicked)
            deletePLayerApiCall()
    }, [isDeleteConfirmClicked])

    // changing fantasyTeamApiResponse
    useEffect(() => {
        if (!fantasyTeamApiResponse)
            return

        setMyPlayers(convertFantasyTeamApiResponse(fantasyTeamApiResponse))
        setRemainingMoney(fantasyTeamApiResponse.data.fantasyteam.money_remaining)
        setUsedPlayer(fantasyTeamApiResponse.data.fantasyteam.number_of_player)
    }, [fantasyTeamApiResponse])

    function deletePLayerApiCall() {
        if (!selectedPosition) {
            onBaseError({myError: selectedPlayerNotFoundError})
            return
        } else if (!myPlayers[selectedPosition]) {
            onBaseError({myError: playerNotFoundError})
            return
        }

        axiosDeletePlayer(myPlayers, selectedPosition).then(
            res =>
                onAxiosSuccess({
                    res: res, myError: deletePlayerError, onSuccess: updateGameInfo
                })
            ,
            error =>
                onAxiosError({axiosError: error, myError: deletePlayerError})
        )
    }

    async function getDate(): Promise<dateType> {
        return axiosWeekInf().then(
            res => {
                return onAxiosSuccess({
                    res: res, myError: loadDateError, onSuccessReturnValue: res.data.data
                })
            },
            error => onAxiosError({axiosError: error, myError: loadDateError})
        )
    }

    const updateGameInfo = () => {
        getDate().then(res => setDate(res))

        axiosFantasyTeam().then(
            res =>
                onAxiosSuccess({
                    res: res,
                    myError: loadTeamError,
                    onSuccess: () => setFantasyTeamApiResponse(res.data)
                }),
            error => onAxiosError({axiosError: error, myError: loadTeamError})
        )

        //    TODO: adding choosePlayer
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
        return () => setSelectedPosition(position)

    }

    function deselectPosition() {
        setSelectedPosition(undefined)
    }

    return (
        <div id={'my-team-main-div'}>
            <DateBax getDate={getDate}/>

            <ChoosePlayer/>
            <div id={'game-info-div'}>
                <div id={'header-of-game-info-div'}>
                    <RemainingPlayer/>
                    <MiddleTabBar/>
                    <RemainingMoney/>
                </div>

                {showingTab === 'schematic' ?
                    <Ground selectPosition={selectPosition}
                            deselectPosition={deselectPosition} gkPositions={gkPositions} defPositions={defPositions}
                            midPositions={midPositions} attPositions={attPositions}/> :
                    // so showingTab === 'list'
                    <MyPlayersList selectPosition={selectPosition}
                                   deselectPosition={deselectPosition} gkPositions={gkPositions}
                                   defPositions={defPositions}
                                   midPositions={midPositions} attPositions={attPositions}/>}
            </div>

        </div>
    )
}