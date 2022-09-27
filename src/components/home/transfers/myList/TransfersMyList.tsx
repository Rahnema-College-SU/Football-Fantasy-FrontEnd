import React from "react";
import './TransfersMyList.css';
import {useRecoilValue} from "recoil";
import {myPlayersState} from "../Transfers";
import {selectedPositionState} from "../schematic/Schematic";
import logo from './assets/logo.svg';
import curveLines from './assets/curve-lines.svg';
import {attPositions, defPositions, gkPositions, midPositions} from "../../../../global/Variables";
import {TransfersMyListPlayer} from "../../player/transfersPlayer/myList/TransfersMyListPlayer";

function TransfersMyList() {
    const myPlayers = useRecoilValue(myPlayersState)
    const selectedPosition = useRecoilValue(selectedPositionState)

    const playersSection = [
        {text: 'دروازه‌بانان', positions: gkPositions},
        {text: 'مدافعان', positions: defPositions},
        {text: 'هافبک‌ها', positions: midPositions},
        {text: 'مهاجمین', positions: attPositions},
    ]

    function getInfoDiv(): JSX.Element {
        return <div id={'info-div'}>
            <TransfersMyListPlayer/>
            <img id={'logo-my-players-list'} src={logo} alt={'logo of premier league'}/>
            <div id={'info-name'}>
                {selectedPosition && myPlayers[selectedPosition] ? myPlayers[selectedPosition].webName : 'none'}
            </div>
            <img id={'curve-lines-my-players-list'} src={curveLines}
                 alt={"curve lines it's somehow the second logo"}/>
        </div>
    }

    function getEahPositionRow(positions: number[]): JSX.Element[] {
        return positions.map(position => <TransfersMyListPlayer position={position}/>)
    }

    function getPlayersRow(): JSX.Element {
        return <div id={'players-div'}>
            <div id={'point'}>عملکرد</div>
            <div id={'price'}>قیمت</div>
            <div id={'first-divider'}></div>

            <div className={'header-div'}>{playersSection[0].text}</div>
            {getEahPositionRow(playersSection[0].positions)}

            <div className={'header-div'}>{playersSection[1].text}</div>
            {getEahPositionRow(playersSection[1].positions)}

            <div className={'header-div'}>{playersSection[2].text}</div>
            {getEahPositionRow(playersSection[2].positions)}

            <div className={'header-div'}>{playersSection[3].text}</div>
            {getEahPositionRow(playersSection[3].positions)}
        </div>
    }

    return (
        <div id={'my-players-list'}>
            {getInfoDiv()}
            {getPlayersRow()}
        </div>
    )
}

export default TransfersMyList;