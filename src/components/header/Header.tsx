import React from 'react'
import threePlayersImage from './assets/three-players-image.svg'
import fourPlayersImage from './assets/four-players-image.svg'
import './Header.css'
import logo from './assets/logo.svg'

function Header() {
    return (
        <div id={'header-main-div'}>
            <img className={'three-players-image'} src={threePlayersImage} alt='Three football players'/>
            <img className={'four-players-image'} src={fourPlayersImage} alt='Four football players'/>
            <div className={'logo-container'}>
                <img className={'logo-image'} src={logo} alt='premier league logo'/>
                <p className={'logo-text'}>فوتبال فانتزی</p>
            </div>
        </div>
    );
}

export default Header;