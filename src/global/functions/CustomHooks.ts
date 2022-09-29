import {useCallback} from "react";
import {playerType} from "../Types";
import {useRecoilState} from "recoil";
import {selectedPositionState} from "../../components/home/transfers/schematic/Schematic";
import {removePlayerModalDisplayState} from "../../components/home/transfers/removePlayerModal/RemovePlayerModal";

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
//TODO
export function useDeletePlayer() {
    const [selectedPosition, setSelectedPosition] = useRecoilState(selectedPositionState)
    const [selectedPlayer, setSelectedPlayer] = useRecoilState(selectedPositionState)
    const [removePlayerModalDisplay, setRemovePlayerModalDisplay] = useRecoilState(removePlayerModalDisplayState)

    return useCallback((player: playerType) => {
        console.log('before:', selectedPosition)
        setSelectedPosition(player.locationInTransferUI)
        console.log('after:', selectedPosition)
        setSelectedPlayer(undefined)
        setRemovePlayerModalDisplay('block')
    }, [setSelectedPosition]);
}