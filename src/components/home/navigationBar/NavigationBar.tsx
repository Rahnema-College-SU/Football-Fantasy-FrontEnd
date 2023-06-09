import React, {useEffect, useState} from 'react';
import './NavigationBar.css';
import {Link, useNavigate} from "react-router-dom";
import {homeTabsEndingUrl} from "../../../global/Variables";
import {
    getHomeTabsStateId,
    getMyTeamSubTabsStateName,
    getTransfersSubTabsStateName,
    setHomeTabsState
} from "../../../global/Storages";

function NavigationBar() {
    const tabs = [
        {id: 1, name: 'تیم من', urlEndingName: homeTabsEndingUrl.myTeam + '/' + getMyTeamSubTabsStateName()},
        {
            id: 2,
            name: 'نقل و انتقالات',
            urlEndingName: homeTabsEndingUrl.transfers + '/' + getTransfersSubTabsStateName()
        },
        {id: 3, name: ' رویدادها', urlEndingName: homeTabsEndingUrl.events},
        {id: 4, name: 'پروفایل', urlEndingName: homeTabsEndingUrl.profile},
        {id: 5, name: 'جوایز', urlEndingName: homeTabsEndingUrl.prizes}
    ]

    const [selectedTab, setSelectedTab] = useState(getHomeTabsStateId())
    const navigate = useNavigate()

    useEffect(() => {
        setHomeTabsState(selectedTab)
    }, [selectedTab])

    return (
        <div id={'nav-bar-div'}>
            <ul id={'nav-bar-list'}>
                {
                    tabs.map(tab => {
                        const urlName = `/home/${tab.urlEndingName}`
                        return <li key={tab.id} onClick={() => {
                            setSelectedTab(tab.id);
                            navigate(urlName)
                        }
                        } id={selectedTab === tab.id ? 'nav-bar-selected' : ''}>
                            <Link id={selectedTab === tab.id ? 'a-selected' : ''} to={urlName}>{tab.name}</Link>
                        </li>
                    })
                }
            </ul>
        </div>
    );
}

export default NavigationBar;