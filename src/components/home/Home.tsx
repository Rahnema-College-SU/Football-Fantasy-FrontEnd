import Header from "../header/Header";
import NavigationBar from "./navigationBar/NavigationBar";
import React, {ReactElement} from "react";

function Home({mainTab}: { mainTab: ReactElement }) {
    return (
        <div id={'home-main-div'}>
            <Header/>
            <NavigationBar/>

            {mainTab}
        </div>
    );
}

export default Home;