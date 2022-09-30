import React from "react";
import './MyTeamSideList.css'
import {SideList} from "../../sideList/SideList";
import {useRecoilValue} from "recoil";
import {myTeamReservePositions} from "../../../../global/Variables";
import {MyTeamSideListPlayer} from "../../player/myTeamPlayer/sideList/MyTeamSideListPlayer";
import {myTeamPlayersState} from "../MyTeam";

export function MyTeamSideList() {
    const myTeamPlayers = useRecoilValue(myTeamPlayersState)

    return (
        <SideList id={'my-team-side-list'} headerText={'بازیکنان ذخیره'}>
            <div id={'reserve-container'}>
                {
                    myTeamReservePositions.map(position =>
                        <MyTeamSideListPlayer className={'reserve-div'} player={myTeamPlayers[position]}/>)
                }
            </div>
        </SideList>
    )
}