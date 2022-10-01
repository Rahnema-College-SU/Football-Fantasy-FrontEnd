export const homeTabsEndingUrl = {
    myTeam: 'my-team',
    transfers: 'transfers',
    events: 'events',
    profile: 'profile',
    prizes: 'prizes'
} as const

export const subTabsEndingUrl = {
    schematic: 'schematic',
    list: 'list'
} as const

export const transfersGkPositions = [1, 12]
export const transfersDefPositions = [2, 3, 4, 5, 13]
export const transfersMidPositions = [6, 7, 8, 9, 14]
export const transfersAttPositions = [10, 11, 15]

export const myTeamGkPositions = [1]
export const myTeamDefPositions = [2, 3, 4, 5]
export const myTeamMidPositions = [6, 7, 8, 9]
export const myTeamAttPositions = [10, 11]
export const myTeamReservePositions = [12, 13, 14, 15]

//They should have the same order as the tabs in the home page
export const positionsServer = ['ALL', 'GKP', 'DEF', 'MID', 'FWD'] as const
export const positionsUi = ['ALL', 'GK', 'DEF', 'MID', 'ATT'] as const