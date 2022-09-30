import React, {useEffect, useRef} from "react";
import './ConfirmationModal.css';
import {clickOnElementById, focusOnElementByRef, handleKeyboardEvent} from "../../../global/functions/General";
import activeCloth from "../assets/active-cloth.svg";
import {RecoilState, useRecoilState, useSetRecoilState} from "recoil";

export function ConfirmationModal({
                                      title,
                                      text,
                                      confirmText,
                                      cancelText,
                                      confirmOnClick,
                                      cancelOnClick,
                                      confirmIdForClick,
                                      cancelIdForClick,
                                      closeModal,
                                      confirmColor,
                                      confirmBackgroundColor,
                                      isConfirmClickedState,
                                      modalDisplayState
                                  }: {
    title: string, text: string, confirmText: string, cancelText: string,
    confirmOnClick: () => any, cancelOnClick: () => any, confirmIdForClick?: string, cancelIdForClick?: string,
    confirmColor: string, confirmBackgroundColor: string, closeModal: boolean
    isConfirmClickedState: RecoilState<boolean>, modalDisplayState: RecoilState<'block' | 'none'>
}) {

    const setIsConfirmClicked = useSetRecoilState(isConfirmClickedState)
    const [modalDisplay, setModalDisplayState] = useRecoilState(modalDisplayState)

    const confirmationModalDivRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (closeModal)
            setModalDisplayState('none')
    })

    useEffect(() => {
        if (modalDisplay === 'none')
            setIsConfirmClicked(false)
    }, [modalDisplay])

    return (
        <div ref={focusOnElementByRef(confirmationModalDivRef)}
             className={'confirmation-modal-div'} style={{display: modalDisplay}} tabIndex={0}
             onKeyUp={handleKeyboardEvent(['Enter', 'Escape'],
                 [clickOnElementById(confirmIdForClick), clickOnElementById(cancelIdForClick)]
             )}>
            <div className={'modal-header'}>{title}</div>
            <img className={'modal-cloth'} src={activeCloth} alt={'active player'}/>
            <div className={'modal-text'}>{text}</div>
            <div className={'modal-buttons-container'}>
                <button id={confirmIdForClick} className={'modal-confirm-button'}
                        style={{color: confirmColor, background: confirmBackgroundColor}} onClick={confirmOnClick}>
                    {confirmText}
                </button>
                <button id={cancelIdForClick} className={'modal-cancel-button'} onClick={() => {
                    setModalDisplayState('none')
                    cancelOnClick()
                }}>{cancelText}</button>
            </div>
        </div>
    )
}