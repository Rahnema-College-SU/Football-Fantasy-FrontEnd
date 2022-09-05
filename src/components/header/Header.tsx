import React from 'react'
import fourPlayersImage from './assets/three-players-image.svg'
import curveLines from './assets/curve-lines.svg'
import './Header.css'
import logo from './assets/logo.svg'

function Header() {
    return (
        <div className={"main-div"}>
            <img className={"three-players-image"} src={fourPlayersImage} alt="Three football players"/>
            <img className={"curve-lines"} src={curveLines}
                 alt="curve lines which related to premier league. It's somehow the second logo"/>
            <div className={"logo-container"}>
                <img className={"logo-image"} src={logo} alt="premier league logo"/>
                <p className={"logo-text"}>فوتبال فانتزی</p>
            </div>
        </div>
    );
}

export default Header;