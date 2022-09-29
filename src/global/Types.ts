import {positionsServer, positionsUi} from "./Variables";

type fantasyTeamInsideApiResponseType = {
    name: string,
    money_remaining: number,
    number_of_player: number
}

type playerWithoutLocationApiType = {
    id: number,
    first_name: string,
    last_name: string,
    web_name: string
    position: {
        "name": string,
        "short_name": positionsServerType
    },
    real_team: {
        "name": string,
        "short_name": string
    },
    player_week_log: {
        "player_cost": number,
        "player_total_points": number
    }
}

export type fantasyTeamApiResponseType = {
    data: {
        username: string,
        fantasyteam: fantasyTeamInsideApiResponseType,
        players_list: Array<playerWithoutLocationApiType & { location_in_ui: number }>
    },
    success: boolean
}

export type playersListApiResponseType = {
    data: {
        username: string,
        fantasyteam: fantasyTeamInsideApiResponseType,
        players_list: Array<playerWithoutLocationApiType>,
        number_of_players: number,
        number_of_pages: number
    },
    success: boolean,
    error_message: string
}

export type choosePlayersListType = {
    playersList: Array<playerType>,
    numberOfPlayers: number | undefined,
    numberOfPages: number | undefined
}

export type playerType = {
    id: number,
    web_name: string,
    position: positionsUiType,
    team: string,
    player_week_log: {
        player_cost: number,
        player_total_points: number
    },
    location_in_ui: number | undefined
}

export type myPlayersType = {
    [key: number]: playerType
}

export type dateType = {
    month_name: String,
    current_week: String,
    week_day: String,
    year: String,
    day: String,
    hour: String
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
    id: string,
    username: string,
    imageUrl: string,
    isFollowed: boolean
}
export type searchResultUserListType = {
    usersList: Array<searchResultUserType>,
    numberOfusers: number | undefined
}