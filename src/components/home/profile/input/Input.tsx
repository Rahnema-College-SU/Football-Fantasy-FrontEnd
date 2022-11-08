import React, {ChangeEventHandler} from "react"
import './Input.css'
import {countries} from "../../../../global/Variables";

export function Input({
                          isEdit,
                          kind,
                          text,
                          isDisabled,
                          onChange
                      }: { isEdit: boolean, kind: 'text' | 'password' | 'country', text: string, isDisabled: boolean, onChange: ChangeEventHandler }) {
    function getPassword() {
        return (
            <div className={'profile-tab-row-text profile-tab-password'}>
                {text.split('').map(() => '•')}
            </div>
        )
    }

    function getPlainText() {
        return (
            <div className={'profile-tab-row-text'} dir={'auto'}>{text}</div>
        )
    }

    function getCountry() {
        return (
            <select className={'profile-tab-row-text profile-tab-row-text-edit'} id={'profile-tab-country'}
                    value={text} onChange={onChange}>
                {countries.map((country) => {
                    return (
                        <option value={country.text}>{country.flag} {country.text}</option>
                    )
                })}
            </select>
        )
    }

    function getPlainTextEdit() {
        return (
            <input className={'profile-tab-row-text profile-tab-row-text-edit'} dir={'auto'} value={text}
                   disabled={isDisabled} onChange={onChange}/>
        )
    }

    return (
        !isEdit ?
            kind === 'password' ? getPassword() : getPlainText()
            :
            kind === 'country' ? getCountry() : getPlainTextEdit()
    )
}