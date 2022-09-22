import {KeyboardEvent, MutableRefObject, useEffect, useState} from "react";

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

export function useMediaQuery(query: string, onMatch: () => any, onDoNotMatch?: () => any) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query)
        if (mediaQueryList.matches !== matches)
            setMatches(mediaQueryList.matches);

        function change(e: MediaQueryListEvent) {
            setMatches(mediaQueryList.matches);

            if (e.matches)
                onMatch()
            else if (onDoNotMatch)
                onDoNotMatch()
        }
        mediaQueryList.addEventListener("change", change)

        return () => mediaQueryList.removeEventListener("change", change)
    }, [matches]);
}