import React from 'react'
import './Ground.css'
import inactiveCloth from './assets/cloth-inactive.svg'
import addIcon from './assets/add-icon.svg'
import activeCloth from './assets/cloth-active.svg'
import deleteIcon from './assets/delete-icon.svg'

function Ground() {
    function getInactiveClothDiv() {
        return (
            <div className={'inactive-div'}>
                <img className={'inactive-cloth'} src={inactiveCloth} alt={'inactive cloth'}/>
                <img className={'add-icon'} src={addIcon} alt={'inactive cloth'}/>
            </div>
        )
    }

    function getActiveClothDiv() {
        return (
            <div className={'active-div'}>
                <img className={'active-cloth'} src={activeCloth} alt={'active cloth'}/>
                <img className={'delete-icon'} src={deleteIcon} alt={'active cloth'}/>
                <div className={'player-name'}>Henderson</div>
                <div className={'power'}>5.5</div>
            </div>
        )
    }

    return (
        <div id={'main-divv'}>
            <div id={'gk-div'}>
                {getActiveClothDiv()}
                {/*{getInactiveClothDiv()}*/}
                {getInactiveClothDiv()}
            </div>
            <div id={'def-div'}>
                {getInactiveClothDiv()}
                {getInactiveClothDiv()}
                {getInactiveClothDiv()}
                {getInactiveClothDiv()}
                {getInactiveClothDiv()}
            </div>
            <div id={'mid-div'}>
                {getInactiveClothDiv()}
                {getInactiveClothDiv()}
                {getInactiveClothDiv()}
                {getInactiveClothDiv()}
                {getInactiveClothDiv()}
            </div>
            <div id={'att-div'}>
                {getInactiveClothDiv()}
                {getInactiveClothDiv()}
                {getInactiveClothDiv()}
            </div>
        </div>
    )
}

export default Ground