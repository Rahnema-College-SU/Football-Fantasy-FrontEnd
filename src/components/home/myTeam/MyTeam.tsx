import {Ground, selectedPositionState} from "./ground/Ground";
import React, {useEffect, useState} from "react";
import './MyTeam.css';
import {RemainingPlayer, usedPlayerState} from "./remainigParts/RemainingPlayer";
import {RemainingMoney, remainingMoneyState} from "./remainigParts/RemainingMoney";
import MiddleTabBar from "./middleTabBar/MiddleTabBar";
import ChoosePlayerList, {
    choosePlayersListState,
    searchState,
    selectedPlayerState
} from "./choosePlayerList/ChoosePlayerList";
import DateBax, {dateState} from "./dateBox/DateBox";
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import MyPlayersList from "./myPlayersList/MyPlayersList";
import {isDeleteConfirmClickedState, removePlayerModalDisplayState} from "./removePlayerModal/RemovePlayerModal";
import {
    addPlayerError,
    deletePlayerError,
    loadDateError,
    loadPlayersListError,
    loadTeamError,
    onAxiosError,
    onAxiosSuccess,
    onBaseError,
    playerNotFoundError,
    selectedPlayerNotFoundError
} from "../../../global/Errors";
import {
    choosePlayersListType,
    dateType,
    fantasyTeamApiResponseType,
    myPlayersType,
    playersListApiResponseType,
    playerType
} from "../../../global/Types";
import {
    axiosAddPlayer,
    axiosDeletePlayer,
    axiosFantasyTeam,
    axiosPlayersList,
    axiosWeekInf
} from "../../../global/ApiCalls";
import {positionsServer, positionsUi} from "../../../global/Variables";

export const myPlayersState = atom<myPlayersType>({
    key: 'myPlayersState',
    default: {}
})

export function MyTeam({showingTab}: { showingTab: 'schematic' | 'list' }) {
    const [fantasyTeamApiResponse, setFantasyTeamApiResponse] = useState<fantasyTeamApiResponseType | undefined>(undefined);
    const [myPlayers, setMyPlayers] = useRecoilState(myPlayersState)
    const setRemainingMoney = useSetRecoilState(remainingMoneyState)
    const setUsedPlayer = useSetRecoilState(usedPlayerState)

    const [playersListApiResponse, setPlayersListApiResponse] = useState<playersListApiResponseType | undefined>(undefined);
    const setChoosePlayersList = useSetRecoilState(choosePlayersListState)
    const selectedPlayer = useRecoilValue(selectedPlayerState)
    const search = useRecoilValue(searchState)

    const setDate = useSetRecoilState(dateState)

    const [selectedPosition, setSelectedPosition] = useRecoilState(selectedPositionState)
    const isDeleteConfirmClicked = useRecoilValue(isDeleteConfirmClickedState)
    const setRemovePlayerModalDisplay = useSetRecoilState(removePlayerModalDisplayState)

    useEffect(() =>  updateGameInfo(), [])

    // for delete confirmation modal
    useEffect(() => {
        setRemovePlayerModalDisplay('none')

        if (isDeleteConfirmClicked)
            deletePLayerApiCall()
    }, [isDeleteConfirmClicked])

    useEffect(() => {
        if (!fantasyTeamApiResponse)
            return

        setMyPlayers(convertFantasyTeamApiResponse(fantasyTeamApiResponse))
        setRemainingMoney(fantasyTeamApiResponse.data.fantasyteam.money_remaining)
        setUsedPlayer(fantasyTeamApiResponse.data.fantasyteam.number_of_player)
    }, [fantasyTeamApiResponse])

    useEffect(() => {
        if (!playersListApiResponse)
            return

        setChoosePlayersList(convertPlayersListApiResponse(playersListApiResponse))
    }, [playersListApiResponse])

    useEffect(() => {
        if (!fantasyTeamApiResponse)
            return

        setMyPlayers(convertFantasyTeamApiResponse(fantasyTeamApiResponse))
        setRemainingMoney(fantasyTeamApiResponse.data.fantasyteam.money_remaining)
        setUsedPlayer(fantasyTeamApiResponse.data.fantasyteam.number_of_player)
    }, [fantasyTeamApiResponse])

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

        playerListApiCall()
    }

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
                    res: res, myError: deletePlayerError, onSuccess: () => {
                        if (selectedPlayer)
                            addPlayerApiCall(selectedPlayer, selectedPosition)
                        else
                            updateGameInfo()
                    }
                })
            ,
            error =>
                onAxiosError({axiosError: error, myError: deletePlayerError})
        )
    }

    function addPlayerApiCall(player: playerType, selectedPosition: number) {
        axiosAddPlayer(player, selectedPosition)
            .then(res =>
                    onAxiosSuccess({
                        res: res, myError: addPlayerError, onSuccess: updateGameInfo
                    }),
                err =>
                    onAxiosError({axiosError: err, myError: addPlayerError})
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

    function playerListApiCall() {
        axiosPlayersList(search).then(
            res =>
                onAxiosSuccess({
                    res: res,
                    myError: loadPlayersListError,
                    onSuccess: () => setPlayersListApiResponse(res.data)
                }),
            error => onAxiosError({axiosError: error, myError: loadPlayersListError})
        )
    }

    function convertFantasyTeamApiResponse(apiResponse: fantasyTeamApiResponseType) {
        return apiResponse.data.players_list.reduce((map: myPlayersType, obj) => {
            map[obj.location_in_ui] = {
                id: obj.id,
                web_name: obj.web_name,
                position: positionsUi[positionsServer.indexOf(obj.position.short_name)],
                team: obj.real_team.short_name,
                player_week_log: {
                    player_cost: obj.player_week_log.player_cost / 10,
                    player_total_points: obj.player_week_log.player_total_points / 10
                },
                location_in_ui: obj.location_in_ui
            }

            return map
        }, {})
    }

    function convertPlayersListApiResponse(apiResponse: playersListApiResponseType): choosePlayersListType {
        const playersList = apiResponse.data.players_list.reduce((array: Array<playerType>, obj) => {
            return [...array, {
                id: obj.id,
                web_name: obj.web_name,
                position: positionsUi[positionsServer.indexOf(obj.position.short_name)],
                team: obj.real_team.short_name,
                player_week_log: {
                    player_cost: obj.player_week_log.player_cost / 10,
                    player_total_points: obj.player_week_log.player_total_points / 10
                },
                location_in_ui: undefined
            }]
        }, [])
        return {
            playersList: playersList,
            numberOfPlayers: apiResponse.data.number_of_players,
            numberOfPages: apiResponse.data.number_of_pages
        }
    }

    function selectPosition(position: number | undefined) {
        return () => setSelectedPosition(position)

    }

    function deselectPosition() {
        setSelectedPosition(undefined)
    }

    return (
        <div id={'my-team-main-div'}>
            <DateBax getDate={getDate}/>

            <ChoosePlayerList playerListApiCall={playerListApiCall} addPlayerApiCall={addPlayerApiCall}/>
            <div id={'game-info-div'}>
                <RemainingPlayer/>
                <MiddleTabBar/>
                <RemainingMoney/>

                {showingTab === 'schematic' ?
                    <Ground selectPosition={selectPosition} deselectPosition={deselectPosition}
                            updateGameInfo={updateGameInfo}/> :
                    // so showingTab === 'list'
                    <MyPlayersList selectPosition={selectPosition} deselectPosition={deselectPosition}/>}
            </div>

        </div>
    )
}