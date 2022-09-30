import React, {useEffect} from "react";
import './MyTeam.css'
import {myPlayersType, subTab} from "../../../global/Types";
import MiddleTabBar from "../middleTabBar/MiddleTabBar";
import {
    homeTabsEndingUrl,
    myTeamAttPositions,
    myTeamDefPositions,
    myTeamGkPositions,
    myTeamMidPositions
} from "../../../global/Variables";
import DateBox, {dateState} from "../dateBox/DateBox";
import {getDate} from "../../../global/functions/General";
import {axiosFantasyTeam, axiosSubstitution} from "../../../global/ApiCalls";
import {loadTeamError, onAxiosError, onAxiosSuccess, substitutionError} from "../../../global/Errors";
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {MyTeamSideList} from "./sideList/MyTeamSideList";
import {fantasyTeamApiResponseState} from "../transfers/Transfers";
import {convertFantasyTeamApiResponseForMyTeam} from "../../../global/functions/Converters";
import {Schematic} from "../transfers/schematic/Schematic";
import MyList from "../transfers/myList/MyList";
import {
    MyTeamSchematicPlayer,
    myTeamSelectedPositionsState
} from "../player/myTeamPlayer/schematic/MyTeamSchematicPlayer";
import {selectedReservePlayerState} from "../player/myTeamPlayer/sideList/MyTeamSideListPlayer";
import {MyTeamMyListPlayer} from "../player/myTeamPlayer/myList/MyTeamMyListPlayer";
import {isSubstitutionConfirmClickedState, substitutionModalDisplayState} from "./substitutionModal/SubstitutionModal";
import {getMyTeamSubTabsStateId, setMyTeamSubTabState} from "../../../global/Storages";

export const myTeamPlayersState = atom<myPlayersType>({
    key: 'myTeamPlayersState',
    default: {}
})

function MyTeam({subTab}: { subTab: subTab }) {
    const [fantasyTeamApiResponse, setFantasyTeamApiResponse] = useRecoilState(fantasyTeamApiResponseState)
    const [myTeamPlayers, setMyTeamPlayers] = useRecoilState(myTeamPlayersState)
    const [selectedReservePlayer, setSelectedReservePlayer] = useRecoilState(selectedReservePlayerState)
    const [myTeamSelectedPositions, setMyTeamSelectedPositions] = useRecoilState(myTeamSelectedPositionsState)
    const [date, setDate] = useRecoilState(dateState)

    const isSubstitutionConfirmClicked = useRecoilValue(isSubstitutionConfirmClickedState)
    const setSubstitutionModalDisplay = useSetRecoilState(substitutionModalDisplayState)

    useEffect(() => updateMyTeamInfo(), [])

    function updateMyTeamInfo() {
        getDate().then(res => setDate(res))

        axiosFantasyTeam().then(
            res =>
                onAxiosSuccess({
                    res: res,
                    myError: loadTeamError,
                    onSuccess: () => {
                        setFantasyTeamApiResponse(res.data)
                        deselectPlayers()
                    }
                }),
            error => onAxiosError({axiosError: error, myError: loadTeamError})
        )
    }

    function deselectPlayers() {
        setSelectedReservePlayer(undefined)
        setMyTeamSelectedPositions([])
    }

    useEffect(() => {
        if (!fantasyTeamApiResponse)
            return

        setMyTeamPlayers(convertFantasyTeamApiResponseForMyTeam(fantasyTeamApiResponse))
    }, [fantasyTeamApiResponse])

    useEffect(() => {
        setSubstitutionModalDisplay('block')

    }, [selectedReservePlayer, myTeamSelectedPositions])

    useEffect(() => {
        setSubstitutionModalDisplay('none')

        if (isSubstitutionConfirmClicked) {
            if (selectedReservePlayer && myTeamSelectedPositions.length === 1)
                substitutionApiCall(myTeamPlayers[myTeamSelectedPositions[0]].id, selectedReservePlayer.id)
            else if (myTeamSelectedPositions.length > 1)
                substitutionApiCall(myTeamPlayers[myTeamSelectedPositions[0]].id, myTeamPlayers[myTeamSelectedPositions[1]].id)
        }
    }, [isSubstitutionConfirmClicked])

    function substitutionApiCall(playerOutId: number, playerInId: number) {
        axiosSubstitution(playerOutId, playerInId).then(
            res =>
                onAxiosSuccess({
                    res: res, myError: substitutionError, onSuccess: () => updateMyTeamInfo(), onError: deselectPlayers
                })
            ,
            error =>
                onAxiosError({axiosError: error, myError: substitutionError, onError: deselectPlayers})
        )
    }

    return (
        <div id={'my-team-main-div'}>
            <div id={'date-and-deadline-container'}>
                <DateBox date={date?.substitutionDeadlineDate} placeHolder={'دریافت مهلت تغییرات ...'} widthStyle={'45%'}
                         marginStyle={'none'}/>
                <DateBox date={date?.nextWeekStartDate} widthStyle={'45%'} marginStyle={'none'}/>
            </div>

            <MyTeamSideList/>
            <div id={'my-team-game-info-div'}>
                <MiddleTabBar mainTab={homeTabsEndingUrl.myTeam} subTabInitialState={getMyTeamSubTabsStateId()}
                              storageSetter={setMyTeamSubTabState} widthStyle={'50%'}/>

                {subTab === 'schematic' ?
                    <Schematic gkPositions={myTeamGkPositions} defPositions={myTeamDefPositions}
                               midPositions={myTeamMidPositions} attPositions={myTeamAttPositions}
                               playerRender={MyTeamSchematicPlayer}/>
                    :
                    <MyList gkPositions={myTeamGkPositions} defPositions={myTeamDefPositions}
                            midPositions={myTeamMidPositions} attPositions={myTeamAttPositions}
                            playerRender={MyTeamMyListPlayer} showingName={() => {
                        if (myTeamSelectedPositions.length !== 0) {
                            if (myTeamSelectedPositions.length === 1 && myTeamPlayers[myTeamSelectedPositions[0]])
                                return myTeamPlayers[myTeamSelectedPositions[0]].webName
                            else if (myTeamPlayers[myTeamSelectedPositions[0]] && myTeamPlayers[myTeamSelectedPositions[1]])
                                return myTeamPlayers[myTeamSelectedPositions[0]].webName + ', ' + myTeamPlayers[myTeamSelectedPositions[1]].webName
                            else
                                return 'Error'
                        } else
                            return 'none'
                    }}/>}
            </div>

        </div>
    )
}

export default MyTeam