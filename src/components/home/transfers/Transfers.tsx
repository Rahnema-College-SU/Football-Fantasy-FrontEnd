import React, {useEffect, useState} from "react";
import './Transfers.css';
import menu from './assets/menu.svg';
import {RemainingPlayer, usedPlayerState} from "./remainigParts/RemainingPlayer";
import {RemainingMoney, remainingMoneyState} from "./remainigParts/RemainingMoney";
import MiddleTabBar from "../middleTabBar/MiddleTabBar";
import {axiosAddPlayer, axiosDeletePlayer, axiosFantasyTeam, axiosPlayersList,} from "../../../global/ApiCalls";
import {
    homeTabsEndingUrl,
    transfersAttPositions,
    transfersDefPositions,
    transfersGkPositions,
    transfersMidPositions
} from "../../../global/Variables";
import DateBox, {dateState} from "../dateBox/DateBox";
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {
    fantasyTeamApiResponseType,
    myPlayersType,
    playersListApiResponseType,
    playerType,
    subTab
} from "../../../global/Types";
import TransfersSideList, {
    searchState,
    selectedFilterItemState,
    selectedPlayerState,
    transfersSideListState
} from "./sideList/TransfersSideList";
import {Schematic} from "./schematic/Schematic";
import {isDeleteConfirmClickedState, removePlayerModalDisplayState} from "./removePlayerModal/RemovePlayerModal";
import {
    convertFantasyTeamApiResponseForTransfers,
    convertPlayersListApiResponse
} from "../../../global/functions/Converters";
import {getDate} from "../../../global/functions/General";
import {
    addPlayerError,
    deletePlayerError,
    loadPlayersListError,
    loadTeamError,
    onAxiosError,
    onAxiosSuccess,
    onBaseError,
    playerNotFoundError,
    selectedPlayerNotFoundError
} from "../../../global/Errors";
import MyList from "./myList/MyList";
import {
    TransfersSchematicPlayer,
    transfersSelectedPositionState
} from "../player/transfersPlayer/schematic/TransfersSchematicPlayer";
import {myTeamSelectedPositionsState} from "../player/myTeamPlayer/schematic/MyTeamSchematicPlayer";
import {TransfersMyListPlayer} from "../player/transfersPlayer/myList/TransfersMyListPlayer";
import {getTransfersSubTabStateId, setTransfersSubTabState} from "../../../global/Storages";

export const fantasyTeamApiResponseState = atom<fantasyTeamApiResponseType | undefined>({
    key: 'fantasyTeamApiResponseState',
    default: undefined
})

export const transfersPlayersState = atom<myPlayersType>({
    key: 'transfersPlayersState',
    default: {}
})

export function Transfers({subTab}: { subTab: subTab }) {
    const [fantasyTeamApiResponse, setFantasyTeamApiResponse] = useRecoilState(fantasyTeamApiResponseState)
    const [transfersPlayers, setTransfersPlayers] = useRecoilState(transfersPlayersState)
    const setRemainingMoney = useSetRecoilState(remainingMoneyState)
    const setUsedPlayer = useSetRecoilState(usedPlayerState)

    const [playersListApiResponse, setPlayersListApiResponse] = useState<playersListApiResponseType | undefined>(undefined)
    const setTransfersSideList = useSetRecoilState(transfersSideListState)
    const [selectedPlayer, setSelectedPlayer] = useRecoilState(selectedPlayerState)
    const setSelectedFilterItem = useSetRecoilState(selectedFilterItemState)
    const search = useRecoilValue(searchState)

    const [date, setDate] = useRecoilState(dateState)

    const transfersSelectedPosition = useRecoilValue(transfersSelectedPositionState)
    const isDeleteConfirmClicked = useRecoilValue(isDeleteConfirmClickedState)
    const setRemovePlayerModalDisplay = useSetRecoilState(removePlayerModalDisplayState)

    const [myTeamSelectedPositions, setMyTeamSelectedPositions] = useRecoilState(myTeamSelectedPositionsState)

    useEffect(() => updateTransfersInfo(), [])

    useEffect(() => {
        if (transfersSelectedPosition === undefined)
            setSelectedPlayer(undefined)
        else {
            if (transfersGkPositions.includes(transfersSelectedPosition))
                setSelectedFilterItem('GK')
            else if (transfersDefPositions.includes(transfersSelectedPosition))
                setSelectedFilterItem('DEF')
            else if (transfersMidPositions.includes(transfersSelectedPosition))
                setSelectedFilterItem('MID')
            else if (transfersAttPositions.includes(transfersSelectedPosition))
                setSelectedFilterItem('ATT')
        }
    }, [transfersSelectedPosition])

    useEffect(() => {
        setRemovePlayerModalDisplay('none')

        if (isDeleteConfirmClicked)
            deletePlayerApiCall()
    }, [isDeleteConfirmClicked])

    useEffect(() => {
        if (!fantasyTeamApiResponse)
            return

        setTransfersPlayers(convertFantasyTeamApiResponseForTransfers(fantasyTeamApiResponse))
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
        if (!transfersSelectedPosition) {
            onBaseError({myError: selectedPlayerNotFoundError})
            return
        } else if (!transfersPlayers[transfersSelectedPosition]) {
            onBaseError({myError: playerNotFoundError})
            return
        }

        axiosDeletePlayer(transfersPlayers, transfersSelectedPosition).then(
            res =>
                onAxiosSuccess({
                    res: res, myError: deletePlayerError, onSuccess: () => {
                        if (selectedPlayer)
                            addPlayerApiCall(selectedPlayer, transfersSelectedPosition)
                        else
                            updateTransfersInfo()

                        if (myTeamSelectedPositions.includes(transfersSelectedPosition))
                            setMyTeamSelectedPositions(myTeamSelectedPositions
                                .filter(position => position !== transfersSelectedPosition))
                    }
                })
            ,
            error =>
                onAxiosError({axiosError: error, myError: deletePlayerError})
        )
    }

    function addPlayerApiCall(player: playerType, transfersSelectedPosition: number) {
        axiosAddPlayer(player, transfersSelectedPosition)
            .then(res =>
                    onAxiosSuccess({
                        res: res, myError: addPlayerError, onSuccess: updateTransfersInfo
                    }),
                err =>
                    onAxiosError({axiosError: err, myError: addPlayerError})
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
        const choosePlayerListStyle: CSSStyleDeclaration = document.getElementById('transfers-side-list')?.style!

        if (choosePlayerListStyle.display === 'flex')
            choosePlayerListStyle.setProperty('display', 'none')
        else
            choosePlayerListStyle.setProperty('display', 'flex')
    }

    // const [transfersSelectedTab, setTransfersSelectedTab] = useState<number>(getTransfersSubTabStateId())
    return (
        <div id={'transfers-main-div'}>
            <div id={'date-and-menu-container'}>
                <DateBox date={date?.nextWeekStartDate}/>
                <img id={'menu-image'} src={menu} onClick={menuOnClick}
                     alt={'menu icon to show all players\' list to add'}/>
            </div>

            <TransfersSideList playerListApiCall={playerListApiCall} addPlayerApiCall={addPlayerApiCall}/>
            <div id={'transfers-game-info-div'}>
                <RemainingPlayer/>
                <MiddleTabBar mainTab={homeTabsEndingUrl.transfers} subTabInitialState={getTransfersSubTabStateId()}
                              storageSetter={setTransfersSubTabState}/>
                <RemainingMoney/>

                {subTab === 'schematic' ?
                    <Schematic gkPositions={transfersGkPositions} defPositions={transfersDefPositions}
                               midPositions={transfersMidPositions} attPositions={transfersAttPositions}
                               playerRender={TransfersSchematicPlayer}/>
                    :
                    <MyList gkPositions={transfersGkPositions} defPositions={transfersDefPositions}
                            midPositions={transfersMidPositions} attPositions={transfersAttPositions}
                            playerRender={TransfersMyListPlayer} showingName={() => {
                        if (transfersSelectedPosition && transfersPlayers[transfersSelectedPosition])
                            return transfersPlayers[transfersSelectedPosition].webName
                        else
                            return 'none'
                    }}/>}
            </div>
        </div>
    )
}