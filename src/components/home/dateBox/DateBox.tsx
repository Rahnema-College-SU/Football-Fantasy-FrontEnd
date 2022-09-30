import React, {useEffect} from "react";
import './DateBox.css';
import {atom, useSetRecoilState} from "recoil";
import {dateApiType, dateType} from "../../../global/Types";
import {getDate} from "../../../global/functions/General";

export const dateState = atom<dateApiType | undefined>({
    key: 'dateState',
    default: undefined
})

export function DateBox({
                            date,
                            placeHolder,
                            widthStyle,
                            marginStyle
                        }: { date: dateType | undefined, placeHolder?: string, widthStyle?: string, marginStyle?: string }) {
    const setDate = useSetRecoilState(dateState)

    useEffect(() => {
        getDate()
            .then(res => setDate(res))
    }, [])

    return (
        date ?
            <div className='date-box' style={{width: widthStyle, margin: marginStyle}}>
                <div id='week-text'>
                    {date.title}
                </div>
                <div id='date-text'>
                    {date.weekDay} {date.day} {date.monthName} {date.year} - ساعت {date.hour}
                </div>
            </div>
            :
            <div className='date-box loading-date-box' style={{width: widthStyle, margin: marginStyle}}>
                {placeHolder ?? 'دریافت تاریخ ...'}
            </div>
    );
}

export default DateBox;