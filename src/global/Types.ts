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
    firstName: String,
    lastName: String,
    fullName: String,
    username: String,
    imageUrl: String,
    followed: Boolean
}
export type substitutionType = {
    playerOutId: String,
    playerInId: String,
}

export type latestEventType = {
    eventId: string,
    weekName: string,
    teamPoints: number,
    liked: boolean,
    firstName: string,
    lastName: string,
    fullName: string,
    username: string,
    imageUrl: string,
    substitutions: substitutionType[]
}

export type userInfoType = {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    fullName: string,
    country: string,
    imageUrl: string,
    teamPoint: number,
    age: number,
    followed: boolean
}

export type profileType = {
    data: {
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        imageUrl: string,
        country: string,
    },
    frontMessage: string,
    userMessage: string
}