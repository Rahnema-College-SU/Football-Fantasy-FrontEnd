import {AxiosResponse} from "axios";

export interface BaseError {
    type: string,
    message: string
}

function errorMaker(type: string) {
    return (message: string) => {
        const newError: BaseError = {
            type: type,
            message: message
        }

        return newError;
    }
}

export const baseError = errorMaker('')('')

export const errorTypes = {
    dateError: 'dateError',
    teamError: 'teamError',
    generalError: 'generalError'
}

const dateError = errorMaker(errorTypes.dateError);
const teamError = errorMaker(errorTypes.teamError);
const generalError = errorMaker(errorTypes.generalError);

const loadDateError = dateError('خطا در دریافت تاریخ')

const loadTeamError = teamError('خطا در دریافت اطّلاعات تیم')
const deletePlayerError = teamError('خطا در حذف بازیکن')

const selectedPlayerNotFoundError = generalError('بازیکنی انتخاب نشده‌است.');
const playerNotFoundError = generalError('بازیکنی یافت نشد.');

export {loadDateError, loadTeamError, deletePlayerError, selectedPlayerNotFoundError, playerNotFoundError};


export function onAxiosSuccess({
                                   res,
                                   myError,
                                   onSuccess,
                                   onError,
                                   onSuccessReturnValue,
                                   onErrorReturnValue
                               }: {
    res: AxiosResponse, myError: BaseError,
    onSuccess?: () => void, onError?: () => void, onSuccessReturnValue?: any, onErrorReturnValue?: any
}) {

    if (res.data.success) {
        if (onSuccess)
            onSuccess()

        return onSuccessReturnValue
    } else
        return onAxiosError({
            axiosError: res,
            myError: myError,
            onError: onError,
            onErrorReturnValue: onErrorReturnValue
        });
}

export function onAxiosError({
                                 axiosError,
                                 myError,
                                 onError,
                                 onErrorReturnValue
                             }: { axiosError: any, myError: BaseError, onError?: () => void, onErrorReturnValue?: any }) {
    console.log(axiosError)

    return onBaseError({
        myError: myError,
        onError: onError,
        onErrorReturnValue: onErrorReturnValue
    })
}

export function onBaseError({
                                myError,
                                onError,
                                onErrorReturnValue
                            }: { myError: BaseError, onError?: () => void, onErrorReturnValue?: any }) {
    console.log(myError)

    //TODO: create custom alert
    alert(myError.message)

    if (onError)
        onError()

    return onErrorReturnValue
}