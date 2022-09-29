import React, {useEffect} from "react";
import './DateBox.css';
import {atom, useRecoilState} from "recoil";
import {dateType} from "../../../../global/Types";
import {getDate} from "../../../../global/functions/General";

export const dateState = atom<dateType | undefined>({
    key: 'dateState',
    default: undefined
})

export function DateBox({
                            dateBoxType,
                            placeHolder,
                            widthStyle,
                            marginStyle
                        }: { dateBoxType: 'date' | 'deadline', placeHolder?: string, widthStyle?: string, marginStyle?: string }) {
    const [date, setDate] = useRecoilState(dateState)

    useEffect(() => {
        getDate()
            .then(res => setDate(res))
    }, [])

    return (
        date ?
            <div className='date-box' style={{width: widthStyle, margin: marginStyle}}>
                <div id='week-text'>{dateBoxType === 'date' ? date.currentWeek ?? '' : 'مهلت تغییرات'}</div>
                <div id='date-text'>
                    {date.weekDay} {date.day} {date.monthName} {date.year} - ساعت {date.hour}
                </div>
            </div>
            :
            <div className='loading-date-box date-box'>
                {placeHolder ?? 'دریافت تاریخ ...'}
            </div>
    );
}

export default DateBox;