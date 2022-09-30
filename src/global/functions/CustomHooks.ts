import {
    transfersSelectedPositionState
} from "../../components/home/player/transfersPlayer/schematic/TransfersSchematicPlayer";
import {selectedPlayerState} from "../../components/home/transfers/sideList/TransfersSideList";
import {useRecoilState} from "recoil";
import {removePlayerModalDisplayState} from "../../components/home/transfers/removePlayerModal/RemovePlayerModal";
import {useCallback} from "react";
import {playerType} from "../Types";


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
    const [transfersSelectedPosition, setTransfersSelectedPosition] = useRecoilState(transfersSelectedPositionState)
    const [selectedPlayer, setSelectedPlayer] = useRecoilState(selectedPlayerState)
    const [removePlayerModalDisplay, setRemovePlayerModalDisplay] = useRecoilState(removePlayerModalDisplayState)

    return useCallback((player: playerType) => {
        console.log('before:', transfersSelectedPosition)
        setTransfersSelectedPosition(player.locationInTransferUI)
        console.log('after:', transfersSelectedPosition)
        setSelectedPlayer(undefined)
        setRemovePlayerModalDisplay('block')
    }, [setTransfersSelectedPosition]);
}