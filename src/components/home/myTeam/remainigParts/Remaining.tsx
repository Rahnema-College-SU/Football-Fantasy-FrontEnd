import React from "react";
import './Remaining.css'
// import {CircularProgress} from "@mui/material";

export function Remaining({
                              showingText,
                              src,
                              text,
                              backgroundStyle,
                              alt
                          }: { showingText: string | undefined, src: string, text: string, backgroundStyle: string, alt: string }) {

    return (
        <div className='remaining-box' style={{background: backgroundStyle}}>
            {
                showingText ?
                    <div className={'show-remaining-text'}>{showingText}</div>
                    :
                    // <CircularProgress thickness={3} style={{color: '#3D195B'}}/>
                    <div>...</div>
            }
            <div className={'logo-and-text'}>
                <img className='remaining-box-logo' src={src} alt={alt}></img>
                <span className={'remaining-box-text'}>{text}</span>
            </div>

        </div>
    );
}