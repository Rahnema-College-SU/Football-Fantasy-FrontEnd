import React from 'react'
import wallet from './assets/wallet.svg'
import {Remaining} from "./Remaining";
import {toFarsiNumber} from "../../../../global/functions/Converters";


export function RemainingMoney({remainingMoney}: { remainingMoney: number }) {

    return (
        <Remaining showingText={remainingMoney !== undefined ? toFarsiNumber(remainingMoney / 10) : undefined}
                   src={wallet}
                   text={'باقی مانده پول'}
                   backgroundStyle={'linear-gradient(266.07deg, #04F4F0 2.18%, #02FDA2 125.43%)'} alt={'wallet'}/>
    );
}

