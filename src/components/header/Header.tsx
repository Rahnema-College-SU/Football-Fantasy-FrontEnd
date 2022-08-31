import React from 'react'
import fourPlayersImage from '../../assets/header/four-players-image.svg'
import curveLines from '../../assets/header/curve-lines.svg'
import './Header.css'
import logo from '../../assets/header/logo.svg'
import header from '../../assets/header/Header.svg'

export function Header() {
    return (
        // <img src={header} alt="four players" className="header__image" style={{
        //     width: '100%',
        // }}/>
        unused()
    );
}

function unused() {
    return (
        <div className="main">
            <img className="four-players-image" src={fourPlayersImage} alt="" />
            <img className="curve-lines" src={curveLines} alt=""/>
            <div className="logo-container">
                <img className="logo-image" src={logo} alt="curve lines which related to premier league. It's somehow the second logo"/>
                <p className="logo-text">فوتبال فانتزی</p>
            </div>
        </div>
    );
}