import React, {ChangeEvent, useRef, useState} from "react";
import "./Profile.css";
import editIcon from './assets/edit-icon.svg'
import uploadIcon from './assets/upload-icon.svg'
import a from './assets/a.gif'
import {CircularProgress} from "@mui/material";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import {useNavigate} from "react-router-dom";
import {setHomeTabsState, setMyTeamSubTabState, setToken, setTransfersSubTabState} from "../../../global/Storages";
import {Input} from "./input/Input";
import {emptyFieldError, onMyError} from "../../../global/Errors";

function Profile() {
    const leftColumnKeys = ['lastName', 'country', 'password'] as const
    const rightColumnKeys = ['firstName', 'email', 'username'] as const
    const columnKeys = [leftColumnKeys, rightColumnKeys]

    type leftColumnKeysType = typeof leftColumnKeys[number]
    type rightColumnKeysType = typeof rightColumnKeys[number]
    type columnKeysType = leftColumnKeysType | rightColumnKeysType
    type columnType = { [key in columnKeysType]: string }

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)
    const [profileImageUrl, setProfileImageUrl] = useState<string>(a)
    // let profileImageUrl = 'https://picsum.photos/200/200'
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate()

    const inputData: { [key in columnKeysType]: { title: string, kind: 'text' | 'password' | 'country' } } = {
        firstName: {title: 'نام', kind: 'text'},
        email: {title: 'ایمیل', kind: 'text'},
        username: {title: 'نام کاربری', kind: 'text'},
        lastName: {title: 'نام خانوادگی', kind: 'text'},
        country: {title: 'کشور', kind: 'country'},
        password: {title: 'رمز عبور', kind: 'password'}
    }

    const [columns, setColumns] = useState<columnType>({
        firstName: 'امیر',
        lastName: 'فخیمی',
        email: 'fakhimi.amirmohamfghjkl;fgdhfdsghjfdsfgkuhjgfdsdfghjgfhdgfghkjghfdsfghfd@gmail.com',
        country: 'ایران',
        username: 'abcd',
        password: '1234'
    })

    const [editedColumns, setEditedColumns] = useState<columnType>({
        firstName: 'امیر',
        lastName: 'فخیمی',
        email: 'fakhimi.amirmohamfghjkl;fgdhfdsghjfdsfgkuhjgfdsdfghjgfhdgfghkjghfdsfghfd@gmail.com',
        country: 'ایران',
        username: 'abcd',
        password: '1234'
    })

    function getHeader() {
        return (
            <div id={'profile-header'}>
                <hr id={'profile-header-left-line'} className={'profile-header-line'}/>
                <div id={'profile-header-text'}>اطّلاعات فردی</div>
                <hr id={'profile-header-right-line'} className={'profile-header-line'}/>
            </div>
        )
    }

    function getProfileImagePart() {
        return (
            [
                <a download={'Fantasy Football Profile Image.png'} href={profileImageUrl}>
                    <img className={'profile-tab-photo-part'} id={'profile-tab-photo'} src={profileImageUrl}
                         onLoad={() => setIsImageLoaded(true)} style={{display: isImageLoaded ? '' : 'none'}}
                         alt={'profile photo'}/>
                </a>,
                <CircularProgress className={'profile-tab-photo-part'} id={'profile-tab-circular-progress'}
                                  style={{display: !isImageLoaded ? '' : 'none'}}/>
            ]
        )
    }

    function getUploadImageButton() {
        return (
            <button id={'upload-image-button'} style={{visibility: isEdit ? 'visible' : 'hidden'}}
                    onClick={() => fileInputRef.current?.click()}>
                <img id={'upload-image-icon'} src={uploadIcon} alt={'upload icon'}/>
                <div id={'upload-image-text'}>بارگذاری تصویر</div>
            </button>
        )
    }

    function getInfo() {
        return (
            columnKeys.map((columnKey) => {
                return (
                    <div className={'profile-tab-column'}>
                        {columnKey.map((key: typeof columnKey[number]) => getEachInput(key))}
                    </div>
                )
            })
        )

        function getEachInput(key: columnKeysType) {
            return (
                <div className={'profile-tab-info-row'}>
                    <div className={'profile-tab-row-title'}>{inputData[key].title}</div>
                    <Input isEdit={isEdit} kind={inputData[key].kind} text={editedColumns[key]}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                               const newEditedColumns = {...editedColumns}
                               newEditedColumns[key] = e.target.value
                               setEditedColumns(newEditedColumns)
                           }}/>
                </div>
            )
        }
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const fileObj = e.target.files && e.target.files[0];
        if (!fileObj)
            return

        document.getElementById('upload-image-text')!.innerHTML = fileObj.name
        setProfileImageUrl(URL.createObjectURL(fileObj))
    }

    function getButtons() {
        function editOnClick() {
            setIsEdit(true)
            setColumns({...editedColumns})
        }

        function confirmOnClick() {
            for (const editedColumnValue of Object.values(editedColumns)) {
                if (!editedColumnValue) {
                    onMyError({myError: emptyFieldError})
                    return
                }
            }

            setIsEdit(false)
            setColumns({...editedColumns})
        }

        function cancelOnClick() {
            setIsEdit(false)
            setEditedColumns({...columns})
        }

        function signOut() {
            setToken('')
            setHomeTabsState(1)
            setMyTeamSubTabState(1)
            setTransfersSubTabState(1)
            navigate('/sign-in')
        }

        return (
            [
                <button className={'profile-tab-button'} id={'profile-tab-edit-button'}
                        onClick={editOnClick} style={{display: isEdit ? 'none' : ''}}>
                    ویرایش
                    <img className={'profile-tab-button-icon'} src={editIcon} alt={'edit icon'}/>
                </button>,
                <button className={'profile-tab-button'} id={'profile-tab-exit-button'}
                        onClick={signOut} style={{display: isEdit ? 'none' : ''}}>
                    خروج از حساب کاربری
                    <ExitToAppRoundedIcon className={'profile-tab-button-icon'}/>
                </button>,

                <button className={'profile-tab-button'} id={'profile-tab-confirm-button'}
                        onClick={confirmOnClick} style={{display: isEdit ? '' : 'none'}}>
                    تأیید
                </button>,
                <button className={'profile-tab-button'} id={'profile-tab-cancel-button'}
                        onClick={cancelOnClick} style={{display: isEdit ? '' : 'none'}}>
                    لغو
                </button>
            ]
        )
    }

    return (
        <div className={'profile-main-div'}>
            {getHeader()}
            {getProfileImagePart()}
            <input ref={fileInputRef} style={{display: 'none'}} type={'file'}
                   accept={".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"} onChange={handleFileChange}/>
            {getUploadImageButton()}
            <div id={'profile-tab-info-container'}>
                {getInfo()}
            </div>

            {getButtons()}
        </div>
    )
}

export default Profile