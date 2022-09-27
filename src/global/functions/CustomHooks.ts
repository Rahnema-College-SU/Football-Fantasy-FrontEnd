import {useEffect, useState} from "react";

// export function useMediaQuery(query: string, onMatch: () => any, onDoNotMatch?: () => any) {
//     const [matches, setMatches] = useState(false);
//
//     useEffect(() => {
//         const mediaQueryList = window.matchMedia(query)
//         if (mediaQueryList.matches !== matches)
//             setMatches(mediaQueryList.matches);
//
//         function change(e: MediaQueryListEvent) {
//             setMatches(mediaQueryList.matches);
//
//             if (e.matches)
//                 onMatch()
//             else if (onDoNotMatch)
//                 onDoNotMatch()
//         }
//
//         mediaQueryList.addEventListener("change", change)
//
//         return () => mediaQueryList.removeEventListener("change", change)
//     }, [matches]);
// }