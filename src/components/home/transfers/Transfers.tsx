import {Schematic, selectedPositionState} from "./schematic/Schematic";
import React, {useEffect, useState} from "react";
import './Transfers.css';
import menu from './assets/menu.svg'
import {RemainingPlayer, usedPlayerState} from "./remainigParts/RemainingPlayer";
import {RemainingMoney, remainingMoneyState} from "./remainigParts/RemainingMoney";
import MiddleTabBar from "./middleTabBar/MiddleTabBar";
import TransfersSideList, {
    searchState,
    selectedFilterItemState,
    selectedPlayerState,
    transfersSideListState
} from "./sideList/TransfersSideList";
import DateBax, {dateState} from "./dateBox/DateBox";
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import TransfersMyList from "./myList/TransfersMyList";
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
import {attPositions, defPositions, gkPositions, midPositions} from "../../../global/Variables";
import {convertFantasyTeamApiResponse, convertPlayersListApiResponse} from "../../../global/functions/Converters";

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
    const setTransfersSideList = useSetRecoilState(transfersSideListState)
    const [selectedPlayer, setSelectedPlayer] = useRecoilState(selectedPlayerState)
    const setSelectedFilterItem = useSetRecoilState(selectedFilterItemState)
    const search = useRecoilValue(searchState)

    const setDate = useSetRecoilState(dateState)

    const selectedPosition = useRecoilValue(selectedPositionState)
    const isDeleteConfirmClicked = useRecoilValue(isDeleteConfirmClickedState)
    const setRemovePlayerModalDisplay = useSetRecoilState(removePlayerModalDisplayState)

    useEffect(() => updateTransfersInfo(), [])

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

    // for delete confirmation modal
    useEffect(() => {
        setRemovePlayerModalDisplay('none')

        if (isDeleteConfirmClicked)
            deletePlayerApiCall()
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

        setTransfersSideList(convertPlayersListApiResponse(playersListApiResponse))
    }, [playersListApiResponse])

    function updateTransfersInfo() {
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

    function deletePlayerApiCall() {
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
                            updateTransfersInfo()
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
                        res: res, myError: addPlayerError, onSuccess: updateTransfersInfo
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

    function menuOnClick() {
        const choosePlayerListStyle: CSSStyleDeclaration = document.getElementById('players-list-main-div')?.style!

        if (choosePlayerListStyle.display === 'flex')
            choosePlayerListStyle.setProperty('display', 'none')
        else
            choosePlayerListStyle.setProperty('display', 'flex')
    }

    return (
        <div id={'my-team-main-div'}>
            <div id={'date-and-menu-container'}>
                <DateBax getDate={getDate}/>
                <img id={'menu-image'} src={menu} onClick={menuOnClick}
                     alt={'menu icon to show all players\' list to add'}/>
            </div>

            <TransfersSideList playerListApiCall={playerListApiCall} addPlayerApiCall={addPlayerApiCall}/>
            <div id={'game-info-div'}>
                <RemainingPlayer/>
                <MiddleTabBar/>
                <RemainingMoney/>

                {subTab === 'schematic' ? <Schematic/> : <TransfersMyList/>}
            </div>

        </div>
    )
}