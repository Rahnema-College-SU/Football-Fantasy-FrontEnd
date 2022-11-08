import React from "react";
import './MyList.css';
import logo from './assets/logo.svg';
import curveLines from './assets/curve-lines.svg';

function MyList({
                    gkPositions,
                    defPositions,
                    midPositions,
                    attPositions,
                    playerRender,
                    showingName
                }: {
    gkPositions: number[], defPositions: number[], midPositions: number[], attPositions: number[],
    playerRender: ({position}: { position?: number }) => JSX.Element, showingName: () => string
}) {
    const playersSection = [
        {text: 'دروازه‌بانان', positions: gkPositions},
        {text: 'مدافعان', positions: defPositions},
        {text: 'هافبک‌ها', positions: midPositions},
        {text: 'مهاجمین', positions: attPositions},
    ]

    function getInfoDiv(): JSX.Element {
        return <div id={'info-div'}>
            {playerRender({position: undefined})}
            <img id={'logo-my-players-list'} src={logo} alt={'logo of premier league'}/>
            <div id={'info-name'}>
                {showingName()}
            </div>
            <img id={'curve-lines-my-players-list'} src={curveLines}
                 alt={"curve lines it's somehow the second logo"}/>
        </div>
    }

    function getEahPositionRow(positions: number[]): JSX.Element[] {
        return positions.map(position => playerRender({position: position}))
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

export default MyList;