import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import "./Profile.css";
import editIcon from './assets/edit-icon.svg'
import uploadIcon from './assets/upload-icon.svg'
import a from './assets/a.gif'
import {CircularProgress} from "@mui/material";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import {useNavigate} from "react-router-dom";
import {setHomeTabsState, setMyTeamSubTabState, setToken, setTransfersSubTabState} from "../../../global/Storages";
import {countries} from "../../../global/Variables";

function Profile() {
    type columnItemType = { title: string, text: string, type: 'text' | 'password' | 'select' }
    type columnType = columnItemType[]
    type columnsType = columnType[]

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate()

    const [columns, setColumns] = useState<columnsType>([
        [
            {title: 'نام خانوادگی', text: 'محمدی', type: 'text'},
            {title: 'کشور', text: 'ایران', type: 'select'},
            {title: 'رمز عبور', text: '۱۲۳۴', type: 'password'},
        ],
        [
            {title: 'نام', text: 'محمد', type: 'text'},
            {
                title: 'ایمیل',
                text: 'fakhimi.amirmohamfghjkl;fgdhfdsghjfdsfgkuhjgfdsdfghjgfhdgfghkjghfdsfghfd@gmail.com',
                type: 'text'
            },
            {title: 'نام کاربری', text: '۱۲۳۴', type: 'text'},
        ]
    ])
    const [editedColumns, setEditedColumns] = useState<columnsType>([
        [
            {title: 'نام خانوادگی', text: 'محمدی', type: 'text'},
            {title: 'کشور', text: 'ایران', type: 'select'},
            {title: 'رمز عبور', text: '۱۲۳۴', type: 'password'},
        ],
        [
            {title: 'نام', text: 'محمد', type: 'text'},
            {
                title: 'ایمیل',
                text: 'fakhimi.amirmohamfghjkl;fgdhfdsghjfdsfgkuhjgfdsdfghjgfhdgfghkjghfdsfghfd@gmail.com',
                type: 'text'
            },
            {title: 'نام کاربری', text: '۱۲۳۴', type: 'text'},
        ]
    ])

    function getHeader() {
        return (
            <div id={'profile-header'}>
                <hr id={'profile-header-left-line'} className={'profile-header-line'}/>
                <div id={'profile-header-text'}>اطّلاعات فردی</div>
                <hr id={'profile-header-right-line'} className={'profile-header-line'}/>
            </div>
        )
    }

    function getUploadImageButton() {
        return (
            <button id={'upload-image-button'} style={{visibility: isEdit ? 'visible' : 'hidden'}}
                    onClick={() => fileInputRef.current?.click()}>
                <img id={'upload-image-icon'} src={uploadIcon} alt={'upload icon'}/>
                <div id={'upload-image-text'}>بارگزاری تصویر</div>
            </button>
        )
    }

    function getInfo() {
        function getEachColumn(column: columnType) {
            function onInputChange(columnItem: columnItemType) {
                return (e: ChangeEvent<HTMLInputElement>) => {
                    const newColumns = [...editedColumns]
                    console.log("In Dare Seda mishe")
                    newColumns[editedColumns.indexOf(column)][column.indexOf(columnItem)].text = e.target.value
                    console.log(columns, newColumns)
                    setEditedColumns(newColumns)
                }
            }

            function getDivOfInput(columnItem: columnItemType) {
                return (
                    columnItem.type === 'password' ?
                        <div className={'profile-tab-row-text profile-tab-password'}>
                            {columnItem.text.split('').map(() => '•')}
                        </div> :
                        <div className={'profile-tab-row-text'}>{columnItem.text}</div>
                )
            }

            function GetInput({columnItem}: { columnItem: columnItemType }) {
                return (
                    columnItem.type === 'select' ?
                        <select className={'profile-tab-row-text profile-tab-row-text-edit'}>
                            {countries.map((country) => {
                                return <option className={'profile-tab-option'}>{country.flag} {country.text}</option>
                            })}
                        </select> :
                        <input className={'profile-tab-row-text profile-tab-row-text-edit'}
                               id={'profile-tab-select'} value={columnItem.text} onChange={onInputChange(columnItem)}/>
                )
            }

            function getTextInput(columnItem: columnItemType) {
                return (
                    isEdit ? <GetInput columnItem={columnItem}></GetInput> : getDivOfInput(columnItem)
                )
            }

            return (
                column.map((columnItem) => {
                    return (
                        <div className={'profile-tab-info-row'}>
                            <div className={'profile-tab-row-title'}>{columnItem.title}</div>
                            {getTextInput(columnItem)}
                        </div>
                    )
                })
            )
        }

        return (
            editedColumns.map((column: columnType) => {
                return (
                    <div className={'profile-tab-column'}>
                        {getEachColumn(column)}
                    </div>
                )
            })
        )
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const fileObj = e.target.files && e.target.files[0];
        if (!fileObj)
            return;

        document.getElementById('upload-image-text')!.innerHTML = fileObj.name;
        (document.getElementsByClassName('profile-tab-photo')[0] as HTMLImageElement).src =
            URL.createObjectURL(fileObj);
    }

    useEffect(() => {
        console.log('columns', columns)
    }, [columns])

    function editOnClick() {
        setIsEdit(true)
        setEditedColumns([...columns])
        // setOneColumnToAnother(setEditedColumns, columns)
    }

    function confirmOnClick() {
        setIsEdit(false)
        // columns = [...editedColumns]
        setColumns([...editedColumns])
        // setOneColumnToAnother(setColumns, editedColumns)
    }

    function cancelOnClick() {
        //     console.log(columns)
        setIsEdit(false)
        setEditedColumns([...columns])
        // setOneColumnToAnother(setEditedColumns, columns)
    }

    // function setOneColumnToAnother(setter: Dispatch<React.SetStateAction<columnType>>, columns: columnType) {
    //     const newColumns = [...columns]
    //
    //     for (let i = 0; i < columns.length; i++) {
    //         for (let j = 0; j < columns.length; j++)
    //             newColumns[i][j].text = columns[i][j].text
    //     }
    //
    //     setter(newColumns)
    // }

    function signOut() {
        setToken('')
        setHomeTabsState(1)
        setMyTeamSubTabState(1)
        setTransfersSubTabState(1)
        navigate('/sign-in')
    }

    return (
        <div className={'profile-main-div'}>
            {getHeader()}
            <img className={'profile-tab-photo'} src={/*'https://picsum.photos/200/200'*/a} /*onError={a}*/
                 onLoad={() => setIsImageLoaded(true)} style={{display: isImageLoaded ? '' : 'none'}}
                 alt={'profile photo'}/>
            <CircularProgress id={'profile-tab-circular-progress'} className={'profile-tab-photo'}
                              style={{display: !isImageLoaded ? '' : 'none'}}/>
            <input ref={fileInputRef} style={{display: 'none'}} type={'file'}
                   accept={".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"} onChange={handleFileChange}/>
            {getUploadImageButton()}
            <div id={'profile-tab-info-container'}>
                {getInfo()}
            </div>

            <button className={'profile-tab-button'} id={'profile-tab-edit-button'}
                    onClick={editOnClick} style={{display: isEdit ? 'none' : ''}}>
                ویرایش
                <img className={'profile-tab-button-icon'} src={editIcon} alt={'edit icon'}/>
            </button>
            <button className={'profile-tab-button'} id={'profile-tab-exit-button'}
                    onClick={signOut} style={{display: isEdit ? 'none' : ''}}>
                خروج از حساب کاربری
                <ExitToAppRoundedIcon className={'profile-tab-button-icon'}/>
            </button>

            <button className={'profile-tab-button'} id={'profile-tab-confirm-button'}
                    onClick={confirmOnClick} style={{display: isEdit ? '' : 'none'}}>
                تأیید
            </button>
            <button className={'profile-tab-button'} id={'profile-tab-cancel-button'}
                    onClick={cancelOnClick} style={{display: isEdit ? '' : 'none'}}>
                لغو
            </button>
        </div>
    )
}

export default Profile