import React from 'react';
import './RemovePlayerAlert.css';

function RemovePlayerAlert({player}: { player : string }) {
    // const [playerName, setPlayerName] = React.useState(player?.web_name)
    //
    // return (
    //     <div id={'remove-player-alert'} style={{display: player ? 'block' : 'none'}}>
    //         <div className="header">
    //             <hr id="line"/>
    //             <div id="headerText">حذف بازیکن</div>
    //             <hr id="line"/>
    //         </div>
    //         <div id="Container">
    //             <label htmlFor="username">آیا از حذف {player ? player.web_name : ''} اطمینان دارید؟</label>
    //             <div id="buttonBar">
    //                 <button className="removeButton">حذف</button>
    //                 <button className="cancelButton">انصراف</button>
    //             </div>
    //         </div>
    //     </div>
    // )
}

export default RemovePlayerAlert;