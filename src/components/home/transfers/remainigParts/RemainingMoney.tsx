import React from 'react'
import wallet from './assets/wallet.svg'
import {atom, useRecoilState} from "recoil";
import {Remaining} from "./Remaining";
import {toFarsiNumber} from "../../../../global/functions/Converters";

export const remainingMoneyState = atom<number | undefined>({
    key: 'remainingMoneyState',
    default: undefined
})

export function RemainingMoney() {
    const [remainingMoney] = useRecoilState(remainingMoneyState)

    return (
        <Remaining showingText={remainingMoney !== undefined ? toFarsiNumber(remainingMoney / 10) : undefined}
                   src={wallet}
                   text={'باقی مانده پول'}
                   backgroundStyle={'linear-gradient(266.07deg, #04F4F0 2.18%, #02FDA2 125.43%)'} alt={'wallet'}/>
    );
}

