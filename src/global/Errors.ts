import {AxiosResponse} from "axios";
//import {enqueueSnackbar} from 'notistack';

//TODO
// export interface BaseError {
//     type: string,
//     message: string
// }
//
// function errorMaker(type: string) {
//     return (message: string) => {
//         const newError: BaseError = {
//             type: type,
//             message: message
//         }
//
//         return newError;
//     }
// }
//
// export const errorTypes = {
//     dateError: 'dateError',
//     teamError: 'teamError',
//     tokenError: 'tokenError',
//     signUpError: 'signUpError',
//     authenticateError: 'authenticateError',
//     signInError: 'signInError',
//     paginationError: 'paginationError',
//     generalError: 'generalError'
// }
//
// const dateError = errorMaker(errorTypes.dateError);
// const teamError = errorMaker(errorTypes.teamError);
// const generalError = errorMaker(errorTypes.generalError);
// const signUpError = errorMaker(errorTypes.signUpError);
// const authenticateError = errorMaker(errorTypes.authenticateError);
// const signInError = errorMaker(errorTypes.signInError);
// const paginationError = errorMaker(errorTypes.paginationError);
// const tokenError = errorMaker(errorTypes.tokenError);
//
// const loadDateError = dateError('خطا در دریافت تاریخ')
//
// const loadTeamError = teamError('خطا در دریافت اطّلاعات تیم')
// const deletePlayerError = teamError('خطا در حذف بازیکن')
// const substitutionError = teamError('خطا در تعویض')
// const loadPlayersListError = teamError('خطا در دریافت اطّلاعات بازیکنان')
// const addPlayerError = teamError('خطا در اضافه کردن بازیکنان')
//
// const loadPaginationError = paginationError('خطا در دریافت اطّلاعات صفحه بندی')
// const pageNotAvailableError = paginationError('صفحه مورد نظر موجود نیست')
//
// const selectedPlayerNotFoundError = generalError('بازیکنی انتخاب نشده‌است.');
// const playerNotFoundError = generalError('بازیکنی یافت نشد.');
//
// const addUserError = signUpError('خطا در ثبت نام');
// const userExistError = signUpError('کاربری با این نام کاربری موجود است')
//
// const invalidCodeError = authenticateError('کد وارد شده صحیح نیست');
//
// const invalidInputError = signInError('نام کاربری یا رمز عبور وارد شده صحیح نیست');
//
// const invalidToken = tokenError('لطفاً دوباره وارد شوید.')
//
// export {
//     loadDateError,
//     loadTeamError,
//     deletePlayerError,
//     substitutionError,
//     loadPlayersListError,
//     addPlayerError,
//     loadPaginationError,
//     pageNotAvailableError,
//     selectedPlayerNotFoundError,
//     playerNotFoundError,
//     addUserError,
//     invalidCodeError,
//     userExistError,
//     invalidInputError,
//     invalidToken
// };

// Error
const addUserError = 'خطا در ثبت نام. لطفاً دوباره تلاش کنید.';
const userExistError = 'کاربری با این نام کاربری موجود است.'
const pageNotAvailableError = 'صفحه‌ی مورد نظر موجود نیست.'
const paginationError = 'خطا در صفحه بندی'
const transfersSelectedPositionNotFoundError = 'بازیکنی انتخاب نشده‌است.'
const playerNotFoundError = 'بازیکنی یافت نشد.'
const emptyFieldError = 'لطفاً تمامی فیلدها را پر کنید.'

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

    if (axiosError.response.data)
        // enqueueSnackbar(axiosError.response.data.userMessage, {variant: 'error'})
    // else
        // enqueueSnackbar('خطا در ارتباط با سرور', {variant: 'error'})

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
        // enqueueSnackbar(myError, {variant: 'error'})

    if (onError)
        onError()

    return onErrorReturnValue
}

export function onInfo(information: string) {
    // enqueueSnackbar(information, {variant: 'info'})
}