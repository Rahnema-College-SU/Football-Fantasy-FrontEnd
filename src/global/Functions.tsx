import {KeyboardEvent, MutableRefObject} from "react";

export const focusOnElementByRef = <T extends HTMLElement>(refName: MutableRefObject<T | null>) => {
    return (e: T | null) => {
        refName.current = e;
        e?.focus();
    }
}

export const handleKeyboardEvent = (keys: Readonly<Array<string>>, onKeyEvents: Array<() => any>) => {
    return (event: KeyboardEvent) => {
        for (let i = 0; i < keys.length; i++) {
            if (event.key === keys[i])
                onKeyEvents[i]();
        }
    }
}