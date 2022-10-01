import {positionsServer, positionsUi} from "./Variables";

export type subTab = 'schematic' | 'list'

type fantasyTeamInsideApiResponseType = {
    name: string,
    moneyRemaining: number,
    numberOfPlayers: number
}

type playerWithoutLocationApiType = {
    id: number,
    firstName: string,
    lastName: string,
    webName: string
    position: {
        name: string,
        shortName: positionsServerType
    },
    realTeam: {
        name: string,
        shortName: string
    },
    playerWeekLog: {
        playerCost: number,
        playerTotalPoints: number
    }
}

export type fantasyTeamApiResponseType = {
    data: {
        fantasyTeam: fantasyTeamInsideApiResponseType,
        playersList: Array<playerWithoutLocationApiType & {
            locationInTransferUI: number,
            locationInTeamUI: number
        }>
    },
    success: boolean
}

export type playersListApiResponseType = {
    data: {
        playersList: Array<playerWithoutLocationApiType>,
        numberOfPlayers: number,
        numberOfPages: number
    },
    success: boolean,
    errorMessage: string
}

export type choosePlayersListType = {
    playersList: Array<playerType>,
    numberOfPlayers: number | undefined,
    numberOfPages: number | undefined
}

export type playerType = {
    id: number,
    webName: string,
    position: positionsUiType,
    team: string,
    playerWeekLog: {
        playerCost: number,
        playerTotalPoints: number
    },
    locationInTransferUI: number | undefined,
    locationInTeamUI: number | undefined
}

export type myPlayersType = {
    [key: number]: playerType
}

export type dateType = {
    monthName: string,
    title: string,
    weekDay: string,
    year: string,
    day: string,
    hour: string,
    minute: string
}

export type dateApiType = {
    nextWeekStartDate: dateType,
    substitutionDeadlineDate: dateType
}

export type positionsUiType = typeof positionsUi[number];
export type positionsServerType = typeof positionsServer[number];
export type sortType = 'ASC' | 'DESC'
export type searchType = {
    search: string,
    position: positionsServerType,
    pointsSort: sortType,
    costsSort: sortType,
    pageNumber: number,
    listSize: number
}

export type searchResultUserType = {
    id: String,
    username: String,
    imageUrl: String,
    isFollowed: Boolean
}