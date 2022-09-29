import React, {useEffect, useState} from "react";
import './MiddleTabBar.css';
import logo from './assets/logo.svg';
import {useNavigate} from "react-router-dom";
import {homeTabsEndingUrl, subTabsEndingUrl} from "../../../../global/Variables";
import {
    getMyTeamSubTabsStateId,
    getTransfersSubTabStateId,
    setMyTeamSubTabState,
    setTransfersSubTabState
} from "../../../../global/Storages";

export function MiddleTabBar({mainTab, /*state, stateSetter, storageSetter,*/ widthStyle}: {
    mainTab: typeof homeTabsEndingUrl.myTeam | typeof homeTabsEndingUrl.transfers,
    /*state: number, stateSetter:  React.Dispatch<React.SetStateAction<number>>, storageSetter: (tab: number) => void,*/ widthStyle?: string
}) {
    const tabs = [
        {id: 1, text: 'شماتیک ترکیب', urlEndingName: subTabsEndingUrl.schematic},
        {id: 2, text: 'مشاهده لیست', urlEndingName: subTabsEndingUrl.list},
    ]

    const [myTeamSelectedTab, setMyTeamSelectedTab] = useState<number>(getMyTeamSubTabsStateId())
    const [transfersSelectedTab, setTransfersSelectedTab] = useState<number>(getTransfersSubTabStateId())
    const navigate = useNavigate()

    useEffect(() => {
        if (mainTab === homeTabsEndingUrl.myTeam)
            setMyTeamSubTabState(myTeamSelectedTab)
        else
            setTransfersSubTabState(transfersSelectedTab)
    }, [myTeamSelectedTab, transfersSelectedTab])
    // useEffect(() => {
    //     storageSetter(state)
    // }, [state])

    return (
        <div id={'middle-tab-bar-main-div'}>
            <img id={'logo'} src={logo} alt={'team logo'}></img>
            <div id={'tab-bar-rectangle'} style={{width: widthStyle}}>
                {
                    tabs.map(tab => {
                        return <div
                            className={mainTab === homeTabsEndingUrl.myTeam && myTeamSelectedTab === tab.id ||
                            mainTab === homeTabsEndingUrl.transfers && transfersSelectedTab === tab.id ? 'tab-rectangle-select' : 'tab-rectangle-unselect'}
                            onClick={() => {
                                if (mainTab === homeTabsEndingUrl.myTeam)
                                    setMyTeamSelectedTab(tab.id)
                                else
                                    setTransfersSelectedTab(tab.id)
                                navigate(`/home/${mainTab}/${tab.urlEndingName}`)
                            }}>
                            {tab.text}
                        </div>
                        // return <div
                        //     className={state === tab.id ? 'tab-rectangle-select' : 'tab-rectangle-unselect'}
                        //     onClick={() => {
                        //         stateSetter(tab.id)
                        //         navigate(`/home/${mainTab}/${tab.urlEndingName}`)
                        //     }}>
                        //     {tab.text}
                        // </div>
                    })
                }
            </div>
        </div>
    );
}

export default MiddleTabBar;