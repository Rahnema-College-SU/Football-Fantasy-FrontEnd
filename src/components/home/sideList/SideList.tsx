import React, {ReactElement} from "react";
import './SideList.css'

export function SideList({
                             id,
                             headerText,
                             children
                         }: { id?: string, headerText: string, children?: ReactElement | ReactElement[] }) {
    return (
        <div id={id} className={'side-list-main-div'}>
            <div className={'side-list-title'}>
                {headerText}
            </div>
            {children}
        </div>
    )
}