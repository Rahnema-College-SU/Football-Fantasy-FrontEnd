import React, {useEffect} from "react";
import './DateBox.css';
import {atom, useRecoilState} from "recoil";

export type dateType = {
    month_name: String,
    current_week: String,
    week_day: String,
    year: String,
    day: String,
    hour: String
}

export const dateState = atom<dateType | undefined>({
    key: 'dateState',
    default: undefined
})

export function DateBax({getDate}: { getDate: () => Promise<dateType> }) {
    const [date, setDate] = useRecoilState(dateState)

    useEffect(() => {
        getDate()
            .then(res => {
                // console.log(res)
                setDate(res)
            })
    }, [])

    return (
        <div>
            <div id="date-box">
                <div id="week-text"> {date?.current_week ?? ''}</div>
                <div id="date-text">{date?.week_day} {date?.day} {date?.month_name} {date?.year}
                    <div id="date-text"> - ساعت {date?.hour} </div>
                </div>

            </div>
        </div>
    );
}

export default DateBax;