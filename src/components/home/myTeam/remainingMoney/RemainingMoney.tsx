import React from 'react'
import wallet from '../../../../assets/remainingMoney/wallet.svg'
import './RemainingMoney.css'


export function RemainingMoney() {
    return (
        <div className="moneyBox">
            <span id='showMoneyText'> ۷۳</span>
            <div id='wallet-and-text'>
                <img className='walletLogo' src={wallet} alt={'wallet'}></img>
                <span id='moneyText'> باقی مانده پول</span>
            </div>

        </div>
    );
}

