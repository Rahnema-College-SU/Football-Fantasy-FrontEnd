import React, {useEffect, useState} from "react";
import './MiddleTabBar.css';
import logo from './assets/logo.svg';
import {useNavigate} from "react-router-dom";
import {getShowingMyTeamTabsState, setShowingMyTeamTabsState} from "../../../../global/Storages";


export function MiddleTabBar() {
    const tabs = [
        {id: 1, text: 'شماتیک ترکیب', urlEndingName: 'schematic'},
        {id: 2, text: 'مشاهده لیست', urlEndingName: 'list'},
    ]

    const [selectedTab, setSelectedTab] = useState<number>(getShowingMyTeamTabsState())
    const navigate = useNavigate()

    useEffect(() => {
        setShowingMyTeamTabsState(selectedTab)
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
                                navigate(`/home/my-team/${tab.urlEndingName}`)
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