import React from "react";
import { useState } from "react";
import './MiddleTabBar.css';
import logo from './assets/logo.svg';
import {Link, useNavigate} from "react-router-dom";



export function MiddleTabBar() {
    const [selectedTab, setSelectedTab] = useState(0)
    const navigate = useNavigate()
    return (
        <div>
            <div id="logo">
                <img src={logo} alt={'team logo'}></img>
            </div>
            <div id="tabBarRectangle">
                <div className='tabRectangle' id={selectedTab===1 ? "is-selected": ""} onClick={() => {
                        setSelectedTab(1);
                        navigate("/home/myteam/shematic")}}>
                    <text>شماتیک ترکیب</text>
                </div>
                <div className='tabRectangle' id={selectedTab===2 ? "is-selected": ""} onClick={() => {
                        setSelectedTab(2);
                        navigate("/home/myteam/teamlist")}}>
                    <text>مشاهده لیست</text>
                </div>
            </div>
        </div>
    );
}

export default MiddleTabBar;