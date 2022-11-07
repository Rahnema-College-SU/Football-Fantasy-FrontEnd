// import { latestEventType } from "@testing-library/react";
import React, {useEffect} from "react";
import "./LatestEvents.css"
import EventItem from "./profiles/Profiles";
import {latestEventType} from "../../../../global/Types";
import {atom, useRecoilState} from "recoil";
import { axiosEventList } from "../../../../global/ApiCalls";
import { onAxiosSuccess ,onAxiosError} from "../../../../global/Errors";

const r = {
    data: [
        {
            eventId: "071393e3-ed93-4b86-b8bf-82b1acdc40f3",
            weekName: "هفته_هشتم#",
            teamPoints: 132,
            liked: false,
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

export const latestEventsDisplayState = atom<"none" | "show">({
    key: 'latestEventsDisplayState',
    default: "show"
})



export function LatestEvents() {
    const [events, setEvents] = useRecoilState(latestEventsListState)
    const [showBox, setShowBox] = useRecoilState(latestEventsDisplayState)

    function letastEventsApiCall(){
        // axiosEventList().then(
        //     res => {
        //         onAxiosSuccess({
        //             res: res, myError: "invalidInputError", onSuccess: () => {
        //                 setEvents(res.data)
        //             }
        //         })
    
        //     },
        //     error => {
        //         onAxiosError({axiosError: error, myError: "invalidInputError"})
        //     }
        //     )
    }
    

    useEffect(() => {
        letastEventsApiCall()
    })
    return (
        <div className={showBox == "show" ? "Latest-Events-Box" : "Hidden-Latest-Events-Box"}>
            <div className="Latest-Events-Title"> آخرین رویداد ها</div>
            <div>
                {events.map((e, index) => <EventItem event={e} key={index}/>)}
            </div>
        </div>
    )
}

export default LatestEvents