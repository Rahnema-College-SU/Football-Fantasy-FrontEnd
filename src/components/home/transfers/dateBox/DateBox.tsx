import React, {useEffect} from "react";
import './DateBox.css';
import {atom, useRecoilState} from "recoil";
import {dateType} from "../../../../global/Types";

export const dateState = atom<dateType | undefined>({
    key: 'dateState',
    default: undefined
})

export function DateBax({getDate}: { getDate: () => Promise<dateType> }) {
    const [date, setDate] = useRecoilState(dateState)

    useEffect(() => {
        getDate()
            .then(res => setDate(res))
    }, [])

    return (
        date ?
            <div className='date-box'>
                <div id='week-text'>{date.currentWeek ?? ''}</div>
                <div id='date-text'>
                    {date.weekDay} {date.day} {date.monthName} {date.year} - ساعت {date.hour}
                </div>
            </div>
            :
            <div className='loading-date-box date-box'>
                دریافت تاریخ ...
            </div>
    );
}

export default DateBax;