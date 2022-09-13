import React from 'react'
import wallet from './assets/wallet.svg'
import './RemainingMoney.css'
import {atom, useRecoilState} from "recoil";
import {toFarsiNumber} from "../../../../global/Variables";

export const remainingMoneyState = atom({
    key: 'remainingMoneyState',
    default: 0
})

export function RemainingMoney() {
    const [remainingMoney] = useRecoilState(remainingMoneyState)

    return (
        <div className="money-box">
            <div id='show-money-text'>{toFarsiNumber(remainingMoney / 10)}</div>
            <div id='wallet-and-text'>
                <img className='wallet-logo' src={wallet} alt={'wallet'}></img>
                <span id='money-text'> باقی مانده پول</span>
            </div>

        </div>
    );
}

