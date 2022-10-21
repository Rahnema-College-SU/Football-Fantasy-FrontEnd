import React, { useEffect } from "react";
import "./LatestEvents.css"
import EventItem from "./profiles/Profiles";
// import { latestEventType } from "@testing-library/react";
import { useState } from "react";
import { profile } from "console";
import { latestEventType } from "../../../../global/Types";
import { atom, useRecoilState } from "recoil";

const r = {
    data: [
      {
        eventId: "071393e3-ed93-4b86-b8bf-82b1acdc40f3",
        weekName: "هفته_هشتم#",
        teamPoints: 132,
        liked: true,
        firstName: "mahdi",  
        lastName: "ranginkaman",  
        fullName: "mahdi ranginkaman",
        username: "mahdi1",
        imageUrl: "",
        substitutions: [
          {
            playerOutId: "Kane",
            playerInId: "Toney",
          },
  
          {
            playerOutId: "Haaland", 
            playerInId: "Kane",
          },
  
          {
            playerOutId: "Toney",
            playerInId: "Haaland",
          },
        ],
      },
    ],
    success: true,
    userError: false,
    errorMessage: "",
  };

  export const latestEventsListState = atom<Array<latestEventType>>({
    key: 'latestEventsListState',
    default: []
})

export function LatestEvents() {
    const [events, setEvents] = useRecoilState(latestEventsListState)
    useEffect(() => {
      setEvents(r.data)
    }, [setEvents])
    return (
        <div className="Latest-Events-Box">
            <div className="Latest-Events-Title"> آخرین رویداد ها</div>
            <div>
            {events.map((e,index) =><EventItem event={e} key={index}/>)  }   
            </div>
        </div>
    )
}

export default LatestEvents