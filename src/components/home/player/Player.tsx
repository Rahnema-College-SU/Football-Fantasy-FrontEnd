import React from "react";
import './Player.css'

export function Player({
                           clothType,
                           isSelected,
                           isActive
                       }: { clothType: 'ground' | 'row', isSelected: boolean, isActive: boolean }) {
    function getGroundCloth() {
        // return (
        // isSelected ? isActive ?
        // )
    }

    function getRowCloth() {
        <div>

        </div>
    }

    return (
        clothType === 'ground' ? getGroundCloth() : getRowCloth()
    )
}