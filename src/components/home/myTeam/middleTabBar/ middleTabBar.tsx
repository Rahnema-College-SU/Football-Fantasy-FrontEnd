import React from "react";
import './middleTabBar.css';
import logo from '../../../../assets/middleTabBar/logo.svg'


export function MiddleTabBar() {
    return (
        <div>
            <div id="logo">
                <img src={logo} alt={'team logo'}></img>
            </div>
            <div id="tabBarRectangle">
                <div id='tabRectangle'>
                    <text>شماتیک ترکیب</text>
                </div>
                <div id='tabRectangle'>
                    <text>مشاهده لیست</text>
                </div>
                {/* <img className='logo' src={logo}></img> */}
            </div>
        </div>
    );
}

export default MiddleTabBar;