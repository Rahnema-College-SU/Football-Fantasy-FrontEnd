import React, {useEffect, useState} from "react";
import './MiddleTabBar.css';
import logo from './assets/logo.svg';
import {useNavigate} from "react-router-dom";
import {getMyTeamSubTabsStateId, setMyTeamSubTabState} from "../../../../global/Storages";
import {homeTabsEndingUrl, subTabsEndingUrl} from "../../../../global/Variables";


export function MiddleTabBar() {
    const tabs = [
        {id: 1, text: 'شماتیک ترکیب', urlEndingName: subTabsEndingUrl.schematic},
        {id: 2, text: 'مشاهده لیست', urlEndingName: subTabsEndingUrl.list},
    ]

    const [selectedTab, setSelectedTab] = useState<number>(getMyTeamSubTabsStateId())
    const navigate = useNavigate()

    useEffect(() => {
        setMyTeamSubTabState(selectedTab)
    }, [selectedTab])

    return (
        <div id={'middle-tab-bar-main-div'}>
            <img id={'logo'} src={logo} alt={'team logo'}></img>
            <div id="tab-bar-rectangle">
                {
                    tabs.map(tab => {
                        return <div
                            className={selectedTab === tab.id ? 'tab-rectangle-select' : 'tab-rectangle-unselect'}
                            onClick={() => {
                                setSelectedTab(tab.id)
                                navigate(`/home/${homeTabsEndingUrl.transfers}/${tab.urlEndingName}`)
                            }}>
                            {tab.text}
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default MiddleTabBar;