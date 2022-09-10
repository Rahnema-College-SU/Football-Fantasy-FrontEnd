import React, { useState } from "react";
import './DateBox.css';
import { useEffect } from "react";
import http from "../../../items/axiosReq";

type DateType = {month_name:String,current_week:String,week_day:String,year:String,day:String,hour:String}

export function DateBax() {
    const [date, setDate] = useState<null | DateType>(null);
    let getData = async ()=> {
        await http.get('weekInf').then(res=>setDate(res.data.data))}
        useEffect(() => {getData()
        //console.log(date)
        },[])
    http.get('').then(res=>console.log(res))
        return (
        <div>
            <div id="dateBox">
                <div id="weekText"> {date?.current_week ?? ''}</div>
                <div id="dateText">{date?.week_day} {date?.day} {date?.month_name} {date?.year}
                <div id="dateText"> - ساعت {date?.hour} </div>
                </div>
                
            </div>
        </div>
    );
}

export default DateBax;