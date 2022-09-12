import {AxiosResponse} from "axios";

export const homeTabsEndingUrl = {
    myTeam: 'my-team',
    transfers: 'transfers',
    latestEvents: 'latest-events',
    profile: 'profile',
    prizes: 'prizes'
}

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1haGRpIiwiaXNfdmVyaWZpZWQiOnRydWUsImlhdCI6MTY2Mjk3NDg2MiwiZXhwIjoxNjYzMDYxMjYyfQ.reJ7nXhAmhbv9MS07cXSG8KyGLNqqHIJRirqds3HEHg'

export const showingMyTeamTabsEndingUrl = {
    schematic: 'schematic',
    list: 'list'
}

export const errorMessages = {
    dateError: 'خطا در دریافت تاریخ',
    loadTeamError: 'خطا در دریافت اطّلاعات تیم',
}

export const serverUrl = 'http://178.216.248.39:8000';

export type player = {
    id: number,
    web_name: string,
    position: string,
    player_week_log: {
        player_cost: number,
        player_total_points: number
    },
    location_in_ui: number
}

export type players = {
    [key: number]: player
}

export type fantasyTeamApiResponseType = {
    data: {
        username: string,
        fantasyteam: {
            name: string,
            money_remaining: number,
            number_of_player: number
        },
        players_list: Array<{
            id: number,
            first_name: string,
            last_name: string,
            web_name: string
            position: {
                "name": string,
                "short_name": string
            },
            real_team: {
                "name": string,
                "short_name": string
            },
            player_week_log: {
                "player_cost": number,
                "player_total_points": number
            },
            location_in_ui: number
        }>
    },
    success: boolean
}

export function toFarsiNumber(number: number) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    return number
        .toString()
        .replace(/\d/g, (x: string) => farsiDigits[parseInt(x)]);
}

export type onAxiosReturnValues = {
    success: any,
    error: any
}

export function onAxiosSuccess({
                                   res,
                                   errorMessage,
                                   onSuccess,
                                   returnValues
                               }: { res: AxiosResponse, errorMessage: string, onSuccess?: () => void, returnValues?: onAxiosReturnValues }) {
    if (res.data.success) {
        if (onSuccess)
            onSuccess()

        return returnValues ? returnValues.success : undefined
    } else
        return onAxiosError({
            error: res,
            errorMessage: errorMessage,
            errorReturnValue: returnValues ? returnValues.error : undefined
        });
}

export function onAxiosError({
                                 error,
                                 errorMessage,
                                 errorReturnValue
                             }: { error: any, errorMessage: string, errorReturnValue?: any }) {
    //TODO: create custom alert
    console.log(error)
    alert(errorMessage)
    return errorReturnValue
}