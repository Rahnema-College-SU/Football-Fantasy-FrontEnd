import React, {useState} from 'react';
import './NavigationBar.css';
import {Link, useNavigate} from "react-router-dom";

function NavigationBar() {
    const tabs = [
        {id: 1, name: 'تیم من', urlName: 'my-team'},
        {id: 2, name: 'نقل و انتقالات', urlName: 'transfers'},
        {id: 3, name: 'آخرین رویدادها', urlName: 'latest-events'},
        {id: 4, name: 'پروفایل', urlName: 'profile'},
        {id: 5, name: 'جوایز', urlName: 'prizes'}
    ]

    const [selectedTab, setSelectedTab] = useState(1)
    const navigate = useNavigate()

    return (
        <div id={'nav-bar-div'}>
            <ul id={'nav-bar-list'}>
                {tabs.map(tab => (
                    <li key={tab.id} onClick={() => {
                        setSelectedTab(tab.id);
                        navigate(tab.urlName)
                    }
                    } id={selectedTab === tab.id ? 'nav-bar-selected' : ''}>
                        <Link id={selectedTab === tab.id ? 'a-selected' : '' } to={`/${tab.urlName}`}>{tab.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NavigationBar;