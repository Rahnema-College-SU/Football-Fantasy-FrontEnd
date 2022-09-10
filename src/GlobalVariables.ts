export const homeTabsEndingUrl = {
    myTeam: 'my-team',
    transfers: 'transfers',
    latestEvents: 'latest-events',
    profile: 'profile',
    prizes: 'prizes'
}

export const serverUrl = 'http://178.216.248.39:8000';

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