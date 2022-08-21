import React from 'react';
import fourPlayersImage from '../../assets/four-players-image.svg'
import curveLines from '../../assets/curve-lines.svg'
import logo from '../../assets/logo.svg'
import header from '../../assets/Header.svg'

export function Header(): React.ReactElement {
    return (
        // <img src={header} alt="four players" className="header__image" style={{
        //     width: '100%',
        // }}/>
        unused()
    );
}

function unused() {
    return <div style={{
        background: "linear-gradient(269.18deg, #04F3F4 0.06%, #01FC9D 47.08%, #05F4F1 99.26%)",
        borderRadius: "0px 0px 16px 16px",
        height: "250px",
        padding: "0px",
        margin: "0px",
    }}>
        <img src={fourPlayersImage} alt="four players image" style={{
            borderRadius: "0px 0px 0px 16px",
            marginLeft: "3.8799%"
        }}/>
        <img src={curveLines} alt="curve lines which related to premier league. It's somehow the second logo" style={{
            position: "fixed",
            borderRadius: "0px 0px 0px 16px",
            float: "right",
            right: "0px",
            display: "inline-flex"
        }}/>
        <div style={{
            // display: "flex",
            // flexDirection: "row",
            // alignItems: "baseline",
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
            position:"relative"
            // justifyContent: "space-between"
        }}>
            <img src={logo} alt="curve lines which related to premier league. It's somehow the second logo" style={{
                position: "fixed",
                right: "100px",
                top: "37px",
                display: "inline-block"
            }}/>
            <p style={{
                // position: "absolute",
                right: "100px",
                top: "37px",
                marginRight: "100px",
            }}>
                فوتبال فانتزی
            </p>
        </div>
    </div>
}