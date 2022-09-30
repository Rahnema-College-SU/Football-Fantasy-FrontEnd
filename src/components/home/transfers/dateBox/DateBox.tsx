import React, {useEffect} from "react";
import './DateBox.css';
import {atom, useRecoilState} from "recoil";
import {dateApiType, dateType} from "../../../../global/Types";
import {getDate} from "../../../../global/functions/General";

export const dateState = atom<dateApiType | undefined>({
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

    function getDateText(date: dateType): string {
        return `${date.weekDay} ${date.day} ${date.monthName} ${date.year} - ساعت ${date.hour}`
    }

    return (
        date ?
            <div className='date-box' style={{width: widthStyle, margin: marginStyle}}>
                <div
                    id='week-text'>{dateBoxType === 'date' ? date.nextWeekStartDate.currentWeek ?? '' : 'مهلت تغییرات'}</div>
                <div id='date-text'>
                    {dateBoxType === 'date' ? getDateText(date.nextWeekStartDate) : getDateText(date.substitutionDeadlineDate)}
                </div>
            </div>
            :
            <div className='date-box loading-date-box' style={{width: widthStyle, margin: marginStyle}}>
                {placeHolder ?? 'دریافت تاریخ ...'}
            </div>
    );
}

export default DateBox;