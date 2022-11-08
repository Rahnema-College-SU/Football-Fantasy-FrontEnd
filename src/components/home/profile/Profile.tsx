import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import "./Profile.css";
import editIcon from './assets/edit-icon.svg'
import uploadIcon from './assets/upload-icon.svg'
import defaultProfileImage from './assets/defaultProfileImage.gif'
import {CircularProgress} from "@mui/material";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import {useNavigate} from "react-router-dom";
import {setHomeTabsState, setMyTeamSubTabState, setToken, setTransfersSubTabState} from "../../../global/Storages";
import {Input} from "./input/Input";
import {emptyFieldError, onAxiosError, onAxiosSuccess, onMyError} from "../../../global/Errors";
import {axiosGetProfile, axiosGetProfileImageUrl, axiosUpdateProfile} from "../../../global/ApiCalls";
import {convertProfileApiResponse} from "../../../global/functions/Converters";

function Profile() {
    const firstRowKeys = ['firstName', 'lastName'] as const
    const secondRowKeys = ['email', 'country'] as const
    const thirdRowKeys = ['username', 'password'] as const
    const rowKeys = [firstRowKeys, secondRowKeys, thirdRowKeys]

    type firstRowKeysType = typeof firstRowKeys[number]
    type secondRowKeysType = typeof secondRowKeys[number]
    type thirdRowKeysType = typeof thirdRowKeys[number]
    type rowKeysType = firstRowKeysType | secondRowKeysType | thirdRowKeysType
    type rowType = { [key in rowKeysType]: string }

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)
    const [profileImageUrl, setProfileImageUrl] = useState<string>(defaultProfileImage)
    const [editedProfileImageUrl, setEditedProfileImageUrl] = useState<string>(defaultProfileImage)
    const [editedProfileFile, setEditedProfileFile] = useState<FormData | undefined>(undefined)

    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate()

    const inputData: { [key in rowKeysType]: { title: string, kind: 'text' | 'password' | 'country', isDisabled: boolean } } = {
        firstName: {title: 'نام', kind: 'text', isDisabled: false},
        lastName: {title: 'نام خانوادگی', kind: 'text', isDisabled: false},
        email: {title: 'ایمیل', kind: 'text', isDisabled: true},
        country: {title: 'کشور', kind: 'country', isDisabled: false},
        username: {title: 'نام کاربری', kind: 'text', isDisabled: true},
        password: {title: 'رمز عبور', kind: 'password', isDisabled: false}
    }

    const [columns, setColumns] = useState<rowType>({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        username: '',
        password: '1234'
    })

    const [editedColumns, setEditedColumns] = useState<rowType>({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        username: '',
        password: '1234'
    })

    useEffect(() => {
        getProfile()
    }, [])

    function getProfile() {
        setIsDataLoaded(false)
        setIsImageLoaded(false)

        axiosGetProfile().then(
            res => onAxiosSuccess({
                res: res,
                onSuccess: () => {
                    const profile = convertProfileApiResponse(res.data)

                    setProfileImageUrl(axiosGetProfileImageUrl(profile.imageUrl))
                    setEditedProfileImageUrl(axiosGetProfileImageUrl(profile.imageUrl))

                    setColumns(profile.info)
                    setEditedColumns(profile.info)

                    setIsDataLoaded(true)
                    setIsEdit(false)
                }
            }),
            error => onAxiosError({axiosError: error})
        )
    }

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
                <a download={'Fantasy Football Profile Image.png'} href={editedProfileImageUrl}>
                    <img className={'profile-tab-photo-part'} id={'profile-tab-photo'} src={editedProfileImageUrl}
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
        function getEachInput(key: rowKeysType) {
            return (
                <div className={'profile-tab-info-row'}>
                    <div className={'profile-tab-row-title'}>{inputData[key].title}</div>
                    <Input isEdit={isEdit} kind={inputData[key].kind} text={editedColumns[key]}
                           isDisabled={inputData[key].isDisabled}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                               const newEditedColumns = {...editedColumns}
                               newEditedColumns[key] = e.target.value
                               setEditedColumns(newEditedColumns)
                           }}/>
                </div>
            )
        }

        return (
            rowKeys.map((columnKey) => {
                return (
                    <div className={'profile-tab-row'}>
                        {columnKey.map((key: typeof columnKey[number]) => getEachInput(key))}
                    </div>
                )
            })
        )
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const fileObj = e.target.files && e.target.files[0];
        if (!fileObj)
            return

        document.getElementById('upload-image-text')!.innerHTML = fileObj.name

        const formData = new FormData();
        formData.append('files', fileObj);
        setEditedProfileFile(formData)
        setEditedProfileImageUrl(URL.createObjectURL(fileObj))
    }

    function getButtons() {
        function editOnClick() {
            setIsEdit(true)
            setColumns({...editedColumns})
            setProfileImageUrl(editedProfileImageUrl)
        }

        function confirmOnClick() {
            for (const editedColumnValue of Object.values(editedColumns)) {
                if (!editedColumnValue) {
                    onMyError({myError: emptyFieldError})
                    return
                }
            }

            updateProfile()
        }

        function updateProfile() {
            axiosUpdateProfile({
                profileImage: editedProfileFile!,
                firstName: editedColumns.firstName,
                lastName: editedColumns.lastName,
                country: editedColumns.country,
                password: editedColumns.password === columns.password ? '' : editedColumns.password
            }).then(
                res => onAxiosSuccess({
                    res: res,
                    onSuccess: () => getProfile()

                }),
                error => onAxiosError({axiosError: error})
            )
        }

        function cancelOnClick() {
            setIsEdit(false)
            setEditedColumns({...columns})
            setEditedProfileImageUrl(profileImageUrl)
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
            <form encType={'multipart/form-data'}>
                <input ref={fileInputRef} style={{display: 'none'}} type={'file'}
                       accept={".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"} onChange={handleFileChange}
                       multiple={true}/>
            </form>
            {getUploadImageButton()}
            <div id={'profile-tab-info-container'}>
                {isDataLoaded ? getInfo() : <CircularProgress id={'data-circular-progress'}/>}
            </div>

            {getButtons()}
        </div>
    )
}

export default Profile