import Header from "../header/Header";
import NavigationBar from "./navigationBar/NavigationBar";
import React from "react";
import MyTeam from "./myTeam/MyTeam";
import Transfers from "./transfers/Transfers";
import LatestEvents from "./latestEvents/LatestEvents";
import Profile from "./profile/Profile";
import Prizes from "./prizes/Prizes";
import {homeTabsEndingUrl} from "../../GlobalVariables";

function Home() {
    function getAppropriateTagOfTab() {
        const url = window.location.href

        if (url.includes(homeTabsEndingUrl.myTeam))
            return <MyTeam/>
        else if (url.includes(homeTabsEndingUrl.transfers))
            return <Transfers/>
        else if (url.includes(homeTabsEndingUrl.latestEvents))
            return <LatestEvents/>
        else if (url.includes(homeTabsEndingUrl.profile))
            return <Profile/>
        else if (url.includes(homeTabsEndingUrl.prizes))
            return <Prizes/>
        else
            return <h1>Error</h1>
    }

    return (
        <div>
            <Header/>
            <NavigationBar/>

            {getAppropriateTagOfTab()}
        </div>
    );
}

export default Home;