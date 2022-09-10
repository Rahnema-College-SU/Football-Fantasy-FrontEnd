import React, {useState} from "react";
import './MiddleTabBar.css';
import logo from './assets/logo.svg';
import {useNavigate} from "react-router-dom";


export function MiddleTabBar() {
    const tabs = [
        {id: 1, text: 'شماتیک ترکیب', urlEndingName: 'schematic'},
        {id: 2, text: 'مشاهده لیست', urlEndingName: 'list'},
    ]

    const [selectedTab, setSelectedTab] = useState<number>(1)
    const navigate = useNavigate()

    return (
        <div>
            <div id="logo">
                <img src={logo} alt={'team logo'}></img>
            </div>
            <div id="tab-bar-rectangle" dir={'rtl'}>
                {
                    tabs.map(tab => {
                        return <div className={selectedTab === tab.id ? 'tab-rectangle' : ''} onClick={() => {
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