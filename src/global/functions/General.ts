import {KeyboardEvent, MutableRefObject} from "react";
import {dateApiType} from "../Types";
import {axiosWeekInf} from "../ApiCalls";
import {loadDateError, onAxiosError, onAxiosSuccess} from "../Errors";

export const focusOnElementByRef = <T extends HTMLElement>(refName: MutableRefObject<T | null>) => {
    return (e: T | null) => {
        refName.current = e;
        e?.focus();
    }
}

export const handleKeyboardEvent = (keys: Readonly<string[]>, onKeyEvents: Array<() => any>) => {
    return (event: KeyboardEvent) => {
        for (let i = 0; i < keys.length; i++) {
            if (event.key === keys[i])
                onKeyEvents[i]();
        }
    }
}

export function clickOnElementById(id?: string) {
    return () => id ? document.getElementById(id)?.click() : undefined;

}

export async function getDate(): Promise<dateApiType> {
    return axiosWeekInf().then(
        res => {
            return onAxiosSuccess({
                res: res, myError: loadDateError, onSuccessReturnValue: res.data.data
            })
        },
        error => onAxiosError({axiosError: error, myError: loadDateError})
    )
}