import {AxiosResponse} from "axios";
import {enqueueSnackbar} from "notistack";

// Error
const addUserError = 'خطا در ثبت نام. لطفاً دوباره تلاش کنید.';
const userExistError = 'کاربری با این نام کاربری موجود است.'
const pageNotAvailableError = 'صفحه‌ی مورد نظر موجود نیست.'
const paginationError = 'خطا در صفحه بندی'
const transfersSelectedPositionNotFoundError = 'بازیکنی انتخاب نشده‌است.'
const playerNotFoundError = 'بازیکنی یافت نشد.'
const emptyFieldError = 'لطفاً تمامی فیلدها را پر کنید.'
const emptyNameError='نام خود را وارد کنید'
const emptyFamilyNameError="نام خانوادگی خود را وارد کنید"
const emptyEmailError = "ایمیل معتبر وارد کنید"
const emptyCountryError = "کشور را انتخاب کنید"
const emptyUsernameError = "نام کاربری را وارد کنید"
const actionError="خطایی رخ داد "


// Info
const invalidToken = 'لطفاً دوباره وارد شوید.'

export {
    addUserError,
    userExistError,
    pageNotAvailableError,
    paginationError,
    transfersSelectedPositionNotFoundError,
    playerNotFoundError,
    emptyFieldError,
    emptyNameError,
    emptyCountryError,
    emptyFamilyNameError,
    emptyEmailError,
    emptyUsernameError,
    actionError,

    invalidToken
}

export function onAxiosSuccess({
                            res,
                            myError,
                            onSuccess,
                            onError,
                            onSuccessReturnValue,
                            onErrorReturnValue
                               }: {
    res: AxiosResponse, myError?: string,
    onSuccess?: () => void, onError?: () => void, onSuccessReturnValue?: any, onErrorReturnValue?: any
}) {

    if (res.status === 200) {
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
                             }: { axiosError: any, myError?: string, onError?: () => void, onErrorReturnValue?: any }) {
    console.log('axiosError:')
    console.log(axiosError)
    console.log('axiosError.response:')
    console.log(axiosError.response)

    if (!axiosError.response || !axiosError.response.data)
        enqueueSnackbar('خطا در ارتباط با سرور', {variant: 'error'})
    else
        enqueueSnackbar(axiosError.response.data.userMessage, {variant: 'error'})

    return onMyError({
        myError: myError,
        onError: onError,
        onErrorReturnValue: onErrorReturnValue
    })
}

export function onMyError({
                              myError,
                              onError,
                              onErrorReturnValue
                          }: { myError?: string, onError?: () => void, onErrorReturnValue?: any }) {
    if (myError)
        enqueueSnackbar(myError, {variant: 'error'})

    if (onError)
        onError()

    return onErrorReturnValue
}

export function onInfo(information: string) {
    enqueueSnackbar(information, {variant: 'info'})
}
export function onS(information: string) {
    enqueueSnackbar(information, {variant: 'success'})
}