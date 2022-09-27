import React from "react";
import './TransfersMyList.css';
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {myPlayersState} from "../Transfers";
import {selectedPositionState} from "../schematic/Schematic";
import activeCloth from './assets/active-cloth.svg'
import inactiveCloth from './assets/inactive-cloth.svg'
import logo from './assets/logo.svg';
import curveLines from './assets/curve-lines.svg';
import {attPositions, defPositions, gkPositions, midPositions} from "../../../../global/Variables";
import deleteIcon from "./assets/delete-icon.svg";
import {removePlayerModalDisplayState} from "../removePlayerModal/RemovePlayerModal";
import {selectedPlayerState} from "../sideList/TransfersSideList";
import {TransfersMyListPlayer} from "../../player/transfersPlayer/myList/TransfersMyListPlayer";

function TransfersMyList() {
    const myPlayers = useRecoilValue(myPlayersState)
    const [selectedPosition, setSelectedPosition] = useRecoilState(selectedPositionState)
    const setRemovePlayerModalDisplay = useSetRecoilState(removePlayerModalDisplayState)
    const setSelectedPlayer = useSetRecoilState(selectedPlayerState)

    const playersSection = [
        {text: 'دروازه‌بانان', positions: gkPositions},
        {text: 'مدافعان', positions: defPositions},
        {text: 'هافبک‌ها', positions: midPositions},
        {text: 'مهاجمین', positions: attPositions},
    ]

    function getInfoDiv(): JSX.Element {
        return <div id={'info-div'}>
            <div id={'div-my-players-info-list'}>
                <img id={'delete-icon-players-list'} src={deleteIcon} alt={'active player'}
                     style={{visibility: (selectedPosition && myPlayers[selectedPosition] ? 'visible' : 'hidden')}}
                     onClick={deletePlayer()}/>
                <img id={'cloth-my-players-list'}
                     src={selectedPosition ? (myPlayers[selectedPosition] ? activeCloth : inactiveCloth) : inactiveCloth}
                     alt={'specific player of players'}/>
            </div>
            <img id={'logo-my-players-list'} src={logo} alt={'logo of premier league'}/>
            <div id={'info-name'}>
                {selectedPosition && myPlayers[selectedPosition] ? myPlayers[selectedPosition].webName : 'none'}
            </div>
            <img id={'curve-lines-my-players-list'} src={curveLines}
                 alt={"curve lines it's somehow the second logo"}/>
        </div>
    }

    function deletePlayer() {
        return () => {
            if (!selectedPosition || !myPlayers[selectedPosition])
                return

            setSelectedPosition(myPlayers[selectedPosition].locationInTransferUI)
            setSelectedPlayer(undefined)
            setRemovePlayerModalDisplay('block')
        }
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