export const homeTabsEndingUrl = {
    myTeam: 'my-team',
    transfers: 'transfers',
    Events: 'events',
    profile: 'profile',
    prizes: 'prizes'
}

let token: string;

export function setToken(t: string) {
    token = t
}

export function getToken() {
    return token
}

export const showingMyTeamTabsEndingUrl = {
    schematic: 'schematic',
    list: 'list'
}

export function toFarsiNumber(number: number) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    return number
        .toString()
        .replace(/\d/g, (x: string) => farsiDigits[parseInt(x)]);
}

export const gkPositions = [1, 2]
export const defPositions = [3, 4, 5, 6, 7]
export const midPositions = [8, 9, 10, 11, 12]
export const attPositions = [13, 14, 15]

//They should have the same order as the tabs in the home page
export const positionsServer = ['ALL', 'GKP', 'DEF', 'MID', 'FWD'] as const
export const positionsUi = ['ALL', 'GK', 'DEF', 'MID', 'ATT'] as const