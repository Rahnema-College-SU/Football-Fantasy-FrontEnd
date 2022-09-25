export const homeTabsEndingUrl = {
    myTeam: 'my-team',
    transfers: 'transfers',
    Events: 'events',
    profile: 'profile',
    prizes: 'prizes'
}

export const subTabsEndingUrl = {
    schematic: 'schematic',
    list: 'list'
}

export function toFarsiNumber(number: number) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    return number
        .toString()
        .replace(/\d/g, (x: string) => farsiDigits[parseInt(x)]);
}

export const gkPositions = [1, 12]
export const defPositions = [2, 3, 4, 5, 13]
export const midPositions = [6, 7, 8, 9, 14]
export const attPositions = [10, 11, 15]

//They should have the same order as the tabs in the home page
export const positionsServer = ['ALL', 'GKP', 'DEF', 'MID', 'FWD'] as const
export const positionsUi = ['ALL', 'GK', 'DEF', 'MID', 'ATT'] as const