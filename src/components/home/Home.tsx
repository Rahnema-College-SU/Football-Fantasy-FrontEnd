import Header from "../header/Header";
import NavigationBar from "./navigationBar/NavigationBar";
import React, {ReactElement} from "react";

function Home({showingTab}: { showingTab: ReactElement }) {
    return (
        <div id={'home-main-div'}>
            <Header/>
            <NavigationBar/>

            {showingTab}
        </div>
    );
}

export default Home;