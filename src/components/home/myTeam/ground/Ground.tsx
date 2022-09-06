import React from 'react'
import './Ground.css'
import groundImage from './assets/ground.svg'

function Ground() {
    return (
        <div id={'main-div'}>
            <img src={groundImage} alt={'soccer ground'}/>
        </div>
    )
}

export default Ground