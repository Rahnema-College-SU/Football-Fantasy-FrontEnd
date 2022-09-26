import {Schematic, selectedPositionState} from "./schematic/Schematic";
import React, {useEffect, useState} from "react";
import './Transfers.css';
import menu from './assets/menu.svg'
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
    playerType,
    subTab
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

export function Transfers({subTab}: { subTab: subTab }) {
    const [fantasyTeamApiResponse, setFantasyTeamApiResponse] = useState<fantasyTeamApiResponseType | undefined>(undefined);
    const [myPlayers, setMyPlayers] = useRecoilState(myPlayersState)
    const setRemainingMoney = useSetRecoilState(remainingMoneyState)
    const setUsedPlayer = useSetRecoilState(usedPlayerState)

    const [playersListApiResponse, setPlayersListApiResponse] = useState<playersListApiResponseType | undefined>(undefined);
    const setChoosePlayersList = useSetRecoilState(choosePlayersListState)
    const selectedPlayer = useRecoilValue(selectedPlayerState)
    const search = useRecoilValue(searchState)

    const setDate = useSetRecoilState(dateState)

    const selectedPosition = useRecoilValue(selectedPositionState)
    const isDeleteConfirmClicked = useRecoilValue(isDeleteConfirmClickedState)
    const setRemovePlayerModalDisplay = useSetRecoilState(removePlayerModalDisplayState)

    useEffect(() => updateGameInfo(), [])

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
        setRemainingMoney(fantasyTeamApiResponse.data.fantasyTeam.moneyRemaining)
        setUsedPlayer(fantasyTeamApiResponse.data.fantasyTeam.numberOfPlayers)
    }, [fantasyTeamApiResponse])

    useEffect(() => {
        if (!playersListApiResponse)
            return

        setChoosePlayersList(convertPlayersListApiResponse(playersListApiResponse))
    }, [playersListApiResponse])

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
            error =>
                onAxiosError({axiosError: error, myError: loadPlayersListError})
        )
    }

    function convertFantasyTeamApiResponse(apiResponse: fantasyTeamApiResponseType) {
        return apiResponse.data.playersList.reduce((map: myPlayersType, obj) => {
            map[obj.locationInTransferUI] = {
                id: obj.id,
                webName: obj.webName,
                position: positionsUi[positionsServer.indexOf(obj.position.shortName)],
                team: obj.realTeam.shortName,
                playerWeekLog: {
                    playerCost: obj.playerWeekLog.playerCost / 10,
                    playerTotalPoints: obj.playerWeekLog.playerTotalPoints / 10
                },
                locationInTransferUI: obj.locationInTransferUI,
                locationInTeamUI: obj.locationInTeamUI
            }

            return map
        }, {})
    }

    function convertPlayersListApiResponse(apiResponse: playersListApiResponseType): choosePlayersListType {
        const playersList = apiResponse.data.playersList.reduce((array: Array<playerType>, obj) => {
            return [...array, {
                id: obj.id,
                webName: obj.webName,
                position: positionsUi[positionsServer.indexOf(obj.position.shortName)],
                team: obj.realTeam.shortName,
                playerWeekLog: {
                    playerCost: obj.playerWeekLog.playerCost / 10,
                    playerTotalPoints: obj.playerWeekLog.playerTotalPoints / 10
                },
                locationInTransferUI: undefined,
                locationInTeamUI: undefined
            }]
        }, [])

        return {
            playersList: playersList,
            numberOfPlayers: apiResponse.data.numberOfPlayers,
            numberOfPages: apiResponse.data.numberOfPages
        }
    }

    function menuOnClick() {
        const choosePlayerListStyle: CSSStyleDeclaration = document.getElementById('players-list-main-div')?.style!

        if (choosePlayerListStyle.display === 'flex')
            choosePlayerListStyle.setProperty('display', 'none')
        else
            choosePlayerListStyle.setProperty('display', 'flex')
    }

    return (
        // <ThingsProvider value={selectPosition}>
        <div id={'my-team-main-div'}>
            <div id={'date-and-menu-container'}>
                <DateBax getDate={getDate}/>
                <img id={'menu-image'} src={menu} onClick={menuOnClick}
                     alt={'menu icon to show all players list to add'}/>
            </div>

            <ChoosePlayerList playerListApiCall={playerListApiCall} addPlayerApiCall={addPlayerApiCall}/>
            <div id={'game-info-div'}>
                <RemainingPlayer/>
                <MiddleTabBar/>
                <RemainingMoney/>

                {subTab === 'schematic' ?
                    <Schematic/> :
                    // so showingTab === 'list'
                    <MyPlayersList/>}
            </div>

        </div>
// </ThingsProvider>
    )
}