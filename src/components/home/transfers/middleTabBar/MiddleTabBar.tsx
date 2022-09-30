import React, {useEffect, useState} from "react";
import './MiddleTabBar.css';
import logo from './assets/logo.svg';
import {useNavigate} from "react-router-dom";
import {homeTabsEndingUrl, subTabsEndingUrl} from "../../../../global/Variables";

export function MiddleTabBar({mainTab, /*state, stateSetter,*/ storageSetter, widthStyle, subTabInitialState}: {
    mainTab: typeof homeTabsEndingUrl.myTeam | typeof homeTabsEndingUrl.transfers, subTabInitialState: number,
    storageSetter: (tab: number) => void, widthStyle?: string
}) {
    const tabs = [
        {id: 1, text: 'شماتیک ترکیب', urlEndingName: subTabsEndingUrl.schematic},
        {id: 2, text: 'مشاهده لیست', urlEndingName: subTabsEndingUrl.list},
    ]

    const [selectedTab, setSelectedTab] = useState<number>(subTabInitialState)
    const navigate = useNavigate()

    useEffect(() => {
        storageSetter(selectedTab)
    }, [selectedTab])

    return (
        <div id={'middle-tab-bar-main-div'}>
            <img id={'logo'} src={logo} alt={'team logo'}></img>
            <div id={'tab-bar-rectangle'} style={{width: widthStyle}}>
                {
                    tabs.map(tab => {
                        return (
                            <div
                                className={selectedTab === tab.id ? 'tab-rectangle-select' : 'tab-rectangle-unselect'}
                                onClick={() => {
                                    setSelectedTab(tab.id)
                                    navigate(`/home/${mainTab}/${tab.urlEndingName}`)
                                }}>
                                {tab.text}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default MiddleTabBar;