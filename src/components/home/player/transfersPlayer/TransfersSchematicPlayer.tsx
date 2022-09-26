import React from "react";

export function TransfersSchematicPlayer({
                                             isSelected,
                                             isActive
                                         }: { isSelected: boolean, isActive: boolean }) {

    // const keyboardKeys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'] as const
    //
    // function handleArrowKey(arrowKey: typeof keyboardKeys[number]) {
    //     function getBeforeNextPositionArrays(position: number): [Array<number>, Array<number>] {
    //         // selected position must be between 1 and 15
    //         if (gkPositions.includes(position))
    //             return [attPositions, defPositions]
    //         else if (defPositions.includes(position))
    //             return [gkPositions, midPositions]
    //         else if (midPositions.includes(position))
    //             return [defPositions, attPositions]
    //         else if (attPositions.includes(position))
    //             return [midPositions, gkPositions]
    //         else
    //             return [[], []]
    //     }
    //
    //     function handleArrowLeftKey(selectedPosition: number) {
    //         if (!handleArrowLeftKeyEachArray(selectedPosition, gkPositions) &&
    //             !handleArrowLeftKeyEachArray(selectedPosition, defPositions) &&
    //             !handleArrowLeftKeyEachArray(selectedPosition, midPositions) &&
    //             !handleArrowLeftKeyEachArray(selectedPosition, attPositions)
    //         )
    //             selectPosition(selectedPosition - 1)()
    //     }
    //
    //     function handleArrowLeftKeyEachArray(selectedPosition: number, array: Array<number>): boolean {
    //         if (selectedPosition === array[0]) {
    //             selectPosition(getBeforeNextPositionArrays(selectedPosition)[0].at(-1))()
    //             return true
    //         } else if (selectedPosition === array.at(-1)) {
    //             selectPosition(array.at(-2))()
    //             return true
    //         }
    //
    //         return false
    //     }
    //
    //     function handleArrowRightKey(selectedPosition: number) {
    //         if (!handleArrowRightKeyEachArray(selectedPosition, gkPositions) &&
    //             !handleArrowRightKeyEachArray(selectedPosition, defPositions) &&
    //             !handleArrowRightKeyEachArray(selectedPosition, midPositions) &&
    //             !handleArrowRightKeyEachArray(selectedPosition, attPositions)
    //         )
    //             selectPosition(selectedPosition + 1)()
    //     }
    //
    //     function handleArrowRightKeyEachArray(selectedPosition: number, array: Array<number>): boolean {
    //         if (selectedPosition === array.at(-2)) {
    //             selectPosition(array.at(-1))()
    //             return true
    //         } else if (selectedPosition === array.at(-1)) {
    //             selectPosition(getBeforeNextPositionArrays(selectedPosition)[1][0])()
    //             return true
    //         }
    //
    //         return false
    //     }
    //
    //     return () => {
    //         if (selectedPosition) {
    //             if (arrowKey === 'ArrowLeft')
    //                 handleArrowLeftKey(selectedPosition)
    //             else if (arrowKey === 'ArrowRight')
    //                 handleArrowRightKey(selectedPosition)
    //             else if (arrowKey === 'ArrowUp')
    //                 selectPosition(getBeforeNextPositionArrays(selectedPosition)[0][0])()
    //             else if (arrowKey === 'ArrowDown')
    //                 selectPosition(getBeforeNextPositionArrays(selectedPosition)[1][0])()
    //         }
    //     }
    // }
    //
    // function getActiveClothDiv(player: playerType): JSX.Element {
    //     return (
    //         <div className='schematic-cloth-div'>
    //             <img className={'delete-icon'} src={deleteIcon} alt={'delete icon'}
    //                  onClick={deletePlayer(player)}/>
    //             <img className={'schematic-cloth'} src={activeCloth} alt={'active player'}
    //                  onClick={selectPosition(player.locationInTransferUI)}/>
    //             <div className={'player-name'}>{player.webName}</div>
    //             <div className={'power'}>{toFarsiNumber(player.playerWeekLog.playerTotalPoints)}</div>
    //         </div>
    //     )
    // }
    //
    // function deletePlayer(player: playerType) {
    //     return () => {
    //         selectPosition(player.locationInTransferUI)()
    //         setSelectedPlayer(undefined)
    //         setRemovePlayerModalDisplay('block')
    //     }
    // }
    //
    // function getInactiveClothDiv(position: number): JSX.Element {
    //     return (
    //         <div className='schematic-cloth-div inactive-cloth-div'>
    //             <img className={'delete-icon'} src={deleteIcon} alt={'delete icon'}
    //                  style={{visibility: 'hidden'}}/>
    //             <img className={'schematic-cloth'} src={inactiveCloth} alt={'inactive player'}
    //                  onClick={selectPosition(position)}/>
    //             <img className={'add-icon'} src={addIcon} alt={'add icon'}
    //                  onClick={selectPosition(position)}/>
    //             <div className={'player-name'} style={{visibility: 'hidden'}}>dummy</div>
    //             <div className={'power'} style={{visibility: 'hidden'}}>۰</div>
    //         </div>
    //     )
    // }
    //
    // function getSelectedInactiveClothDiv(): JSX.Element {
    //     return (
    //         <div className='schematic-cloth-div selected-cloth-div' ref={focusOnElementByRef(selectedDivRef)}
    //              tabIndex={0}
    //              onKeyUp={
    //                  handleKeyboardEvent(keyboardKeys, keyboardKeys.map(key => handleArrowKey(key))
    //                  )}>
    //             <img className={'delete-icon'} src={deleteIcon} alt={'delete icon'}
    //                  style={{visibility: 'hidden'}}/>
    //             <img className={'schematic-cloth'} src={selectedCloth} alt={'selected player'}
    //                  onClick={deselectPosition}/>
    //             <div className={'player-name'} style={{visibility: 'hidden'}}>dummy</div>
    //             <div className={'power'} style={{visibility: 'hidden'}}>۰</div>
    //         </div>
    //     )
    // }
    //
    // function getSelectedActiveClothDiv(player: playerType): JSX.Element {
    //     return (
    //         <div className='schematic-cloth-div selected-cloth-div' ref={focusOnElementByRef(selectedDivRef)}
    //              tabIndex={0}
    //              onKeyUp={
    //                  handleKeyboardEvent([...keyboardKeys, 'Backspace'], [...keyboardKeys.map(key => handleArrowKey(key)), () => deletePlayer(player)()]
    //                  )}>
    //             <img className={'delete-icon'} src={deleteIcon} alt={'delete icon'}
    //                  onClick={deletePlayer(player)}/>
    //             <img className={'schematic-cloth'} src={selectedCloth} alt={'selected player'}
    //                  onClick={deselectPosition}/>
    //             <div className={'player-name'}>{player.webName}</div>
    //             <div className={'power'}>{toFarsiNumber(player.playerWeekLog.playerTotalPoints)}</div>
    //         </div>
    //     )
    // }

    return (
        // isSelected ? isActive :
        //     getSelectedActiveClothDiv(player)
        <div></div>
    )
}