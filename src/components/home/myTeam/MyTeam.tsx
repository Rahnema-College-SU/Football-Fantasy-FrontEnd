import React, {useEffect, useState} from "react";
import './MyTeam.css'
import {fantasyTeamApiResponseType, subTab} from "../../../global/Types";
import MiddleTabBar from "../transfers/middleTabBar/MiddleTabBar";
import {homeTabsEndingUrl} from "../../../global/Variables";
import DateBox, {dateState} from "../transfers/dateBox/DateBox";
import {getDate} from "../../../global/functions/General";
import {axiosFantasyTeam} from "../../../global/ApiCalls";
import {loadTeamError, onAxiosError, onAxiosSuccess} from "../../../global/Errors";
import {useRecoilState, useSetRecoilState} from "recoil";
import {MyTeamSideList} from "./sideList/MyTeamSideList";
import {fantasyTeamApiResponseState, myPlayersState} from "../transfers/Transfers";
import {convertFantasyTeamApiResponse} from "../../../global/functions/Converters";

function MyTeam({subTab}: { subTab: subTab }) {
    const [fantasyTeamApiResponse, setFantasyTeamApiResponse] = useRecoilState(fantasyTeamApiResponseState)
    const [myPlayers, setMyPlayers] = useRecoilState(myPlayersState)
    const setDate = useSetRecoilState(dateState)

    useEffect(() => updateMyTeamInfo(), [])

    function updateMyTeamInfo() {
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
    }

    useEffect(() => {
        if (!fantasyTeamApiResponse)
            return

        setMyPlayers(convertFantasyTeamApiResponse(fantasyTeamApiResponse))
    }, [fantasyTeamApiResponse])

    return (
        <div id={'my-team-main-div'}>
            <div id={'date-and-deadline-container'}>
                <DateBox dateBoxType={'deadline'} placeHolder={'دریافت مهلت تغییرات ...'} widthStyle={'45%'}
                         marginStyle={'none'}/>
                <DateBox dateBoxType={'date'} widthStyle={'45%'} marginStyle={'none'}/>
            </div>

            <MyTeamSideList/>
            <div id={'my-team-game-info-div'}>
                <MiddleTabBar mainTab={homeTabsEndingUrl.myTeam} widthStyle={'50%'}/>

                {/*{subTab === 'schematic' ? <Schematic/> : <TransfersMyList/>}*/}
            </div>

        </div>
    )
}

export default MyTeam