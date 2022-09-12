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
        <div>
            {
                date ?
                    <div id='date-box'>
                        <div id='week-text'>{date.current_week ?? ''}</div>
                        <div id='date-text'>
                            {date.week_day} {date.day} {date.month_name} {date.year} - ساعت {date.hour}
                        </div>
                    </div>
                    :
                    <div id='date-box'>
                        {'لود تاریخ'}
                    </div>
            }
        </div>
    );
}

export default DateBax;