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

export type dateType = {
    month_name: String,
    current_week: String,
    week_day: String,
    year: String,
    day: String,
    hour: String
}