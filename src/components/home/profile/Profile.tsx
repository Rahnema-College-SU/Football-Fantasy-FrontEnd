import React, {ChangeEvent, useRef, useState} from "react";
import "./Profile.css";
import editIcon from './assets/edit-icon.svg'
import uploadIcon from './assets/upload-icon.svg'
import a from './assets/a.gif'
import {CircularProgress} from "@mui/material";

function Profile() {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const [columns, setColumns] = useState<{ title: string, text: string }[][]>([
        [
            {title: 'نام خانوادگی', text: 'محمدی'},
            {title: 'کشور', text: 'ایران'},
            {title: 'رمز عبور', text: '۱۲۳۴'},
        ],
        [
            {title: 'نام', text: 'محمد'},
            {
                title: 'ایمیل',
                text: 'fakhimi.amirmohamfghjkl;fgdhfdsghjfdsfgkuhjgfdsdfghjgfhdgfghkjghfdsfghfd@gmail.com'
            },
            {title: 'نام کاربری', text: '۱۲۳۴'},
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

    function getInfo() {
        function getEachColumn(column: { title: string, text: string }[]) {
            function onInputChange(columnItem: { title: string, text: string }) {
                return (e: ChangeEvent<HTMLInputElement>) => {
                    const newColumns = [...columns]
                    newColumns[columns.indexOf(column)][column.indexOf(columnItem)].text = e.target.value
                    setColumns(newColumns)
                }
            }

            return (
                column.map((item) => {
                    return (
                        <div className={'profile-tab-info-row'}>
                            <div className={'profile-tab-row-title'}>{item.title}</div>
                            {
                                isEdit ?
                                    <input
                                        className={'profile-tab-row-text' + (isEdit ? ' profile-tab-row-text-edit' : '')}
                                        disabled={!isEdit} value={item.text} onChange={onInputChange(item)}/>
                                    :
                                    <div
                                        className={'profile-tab-row-text' + (isEdit ? ' profile-tab-row-text-edit' : '')}>{item.text}</div>
                            }
                        </div>
                    )
                })
            )
        }

        return (
            columns.map((column: { title: string, text: string }[]) => {
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

    return (
        <div className={'profile-main-div'}>
            {getHeader()}
            <img className={'profile-tab-photo'} src={/*'https://picsum.photos/200/200'*/a} onLoad={() => setIsImageLoaded(true)} style={{display: isImageLoaded ? '' : 'none'}} alt={'profile photo'}/>
            <CircularProgress id={'profile-tab-circular-progress'} className={'profile-tab-photo'} style={{display: !isImageLoaded ? '' : 'none'}}/>
            <input ref={fileInputRef} style={{display: 'none'}} type={'file'}
                   accept={".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"} onChange={handleFileChange}/>
            <button id={'upload-image-button'} style={{visibility: isEdit ? 'visible' : 'hidden'}}
                    onClick={() => fileInputRef.current?.click()}>
                <img id={'upload-image-icon'} src={uploadIcon} alt={'upload icon'}/>
                <div id={'upload-image-text'}>بارگزاری تصویر</div>
            </button>
            <div id={'profile-tab-info-container'}>
                {getInfo()}
            </div>
            <button className={'profile-tab-button'} id={'profile-tab-edit-button'}
                    onClick={() => setIsEdit(true)} style={{display: isEdit ? 'none' : ''}}>
                ویرایش
                <img id={'profile-tab-edit-icon'} src={editIcon} alt={'edit icon'}/>
            </button>
            <button className={'profile-tab-button'} id={'profile-tab-confirm-button'}
                    onClick={() => setIsEdit(false)} style={{display: isEdit ? '' : 'none'}}>
                تأیید
            </button>
        </div>
    )
}

export default Profile