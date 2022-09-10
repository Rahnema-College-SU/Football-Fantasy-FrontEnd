import React, {useState} from 'react';
import './NavigationBar.css';
import {Link, useNavigate} from "react-router-dom";
import {homeTabsEndingUrl, showingMyTeamTabsEndingUrl} from "../../../GlobalVariables";

function NavigationBar() {
    const tabs = [
        {id: 1, name: 'تیم من', urlEndingName: homeTabsEndingUrl.myTeam + '/' + showingMyTeamTabsEndingUrl.schematic},
        {id: 2, name: 'نقل و انتقالات', urlEndingName: homeTabsEndingUrl.transfers},
        {id: 3, name: 'آخرین رویدادها', urlEndingName: homeTabsEndingUrl.latestEvents},
        {id: 4, name: 'پروفایل', urlEndingName: homeTabsEndingUrl.profile},
        {id: 5, name: 'جوایز', urlEndingName: homeTabsEndingUrl.prizes}
    ]

    const [selectedTab, setSelectedTab] = useState(1)
    const navigate = useNavigate()

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