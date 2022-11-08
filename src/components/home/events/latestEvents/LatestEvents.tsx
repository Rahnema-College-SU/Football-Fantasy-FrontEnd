import React, {useEffect} from "react";
import "./LatestEvents.css"
import EventItem from "./profiles/EventItem";
import {latestEventType} from "../../../../global/Types";
import {atom, useRecoilState, useRecoilValue} from "recoil";
import {axiosEventList} from "../../../../global/ApiCalls";
import {onAxiosError, onAxiosSuccess} from "../../../../global/Errors";

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
    const showBox = useRecoilValue(latestEventsDisplayState)

    function latestEventsApiCall() {
        axiosEventList().then(
            res => {
                onAxiosSuccess({
                    res: res, myError: "invalidInputError", onSuccess: () => {
                        setEvents(res.data.data)
                    }
                })

            },
            error => {
                onAxiosError({axiosError: error, myError: "invalidInputError"})
            }
        )
    }

    useEffect(() => {
        latestEventsApiCall()
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