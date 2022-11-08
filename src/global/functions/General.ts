import {axiosFollow, axiosUnfollow, axiosWeekInf} from '../ApiCalls';
import {KeyboardEvent, MutableRefObject} from "react";
import {dateApiType} from "../Types";
import {actionError, onAxiosError, onAxiosSuccess, onS} from "../Errors";

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
                res: res, onSuccessReturnValue: res.data.data
            })
        },
        error => onAxiosError({axiosError: error})
    )
}

export function handleFollowing(id: any) {
    console.log(id);
    axiosFollow(id).then(
        res => {
            onAxiosSuccess({
                res: res, myError: actionError, onSuccess: () => {
                    onS("به دنبال شوندگان افزوده شد")
                }
            })
        },
        error => {
            onAxiosError({axiosError: error, myError: actionError})
        }
    )
}

export function handleUnfollow(id: string) {
    axiosUnfollow(id).then(
        res => {
            onAxiosSuccess({
                res: res, myError: actionError, onSuccess: () => {
                    onS("از دنبال شوندگان حذف شد")
                }

            })

        },
        error => {
            onAxiosError({axiosError: error, myError: actionError})
        }
    )
}