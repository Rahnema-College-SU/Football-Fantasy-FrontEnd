import React from "react";
import './MyTeam.css'
import {subTab} from "../../../global/Types";
import MiddleTabBar from "../transfers/middleTabBar/MiddleTabBar";
import {homeTabsEndingUrl} from "../../../global/Variables";
import DateBox from "../transfers/dateBox/DateBox";

function MyTeam({subTab}: { subTab: subTab }) {
    return (
        <div id={'my-team-main-div'}>
            <div id={'date-and-deadline-container'}>
                <DateBox dateBoxType={'deadline'} placeHolder={'دریافت مهلت تغییرات ...'} widthStyle={'45%'}
                         marginStyle={'none'}/>
                <DateBox dateBoxType={'date'} widthStyle={'45%'} marginStyle={'none'}/>
            </div>

            {/*<TransfersSideList playerListApiCall={playerListApiCall} addPlayerApiCall={addPlayerApiCall}/>*/}
            <div id={'my-team-game-info-div'}>
                {/*<RemainingPlayer/>*/}
                <MiddleTabBar mainTab={homeTabsEndingUrl.myTeam} widthStyle={'50%'}/>
                {/*<RemainingMoney/>*/}

                {/*{subTab === 'schematic' ? <Schematic/> : <TransfersMyList/>}*/}
            </div>

        </div>
    )
}

export default MyTeam