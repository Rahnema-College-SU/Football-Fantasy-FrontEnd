import React from "react";
import './MiddleTabBar.css';


export function MiddleTabBar() {
    return (
        <div>
            {/*<div id="logo">*/}
            {/*    <img src={logo} alt={'team logo'}></img>*/}
            {/*</div>*/}
            <div id="tabBarRectangle">
                <div id='tabRectangle'>
                    <text>شماتیک ترکیب</text>
                </div>
                <div id='tabRectangle'>
                    <text>مشاهده لیست</text>
                </div>
            </div>
        </div>
    );
}

export default MiddleTabBar;