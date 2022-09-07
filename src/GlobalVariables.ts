export const homeTabsEndingUrl = {
    myTeam: 'my-team',
    transfers: 'transfers',
    latestEvents: 'latest-events',
    profile: 'profile',
    prizes: 'prizes'
}

const myTeamApiResponse = {
    "data": {
        "username": "mahdi07",
        "fantasyteam": {
            "name": "Mahdi/'s Team",
            "money_remaining": 88,
            "number_of_player": 12
        },
        "players_list": [
            {
                "id": 398,
                "first_name": "Dean",
                "last_name": "Henderson",
                "web_name": "Henderson",
                "position": {
                    "name": "Goalkeeper",
                    "short_name": "GKP"
                },
                "real_team": {
                    "name": "Nott'm Forest",
                    "short_name": "NFO"
                },
                "player_week_log": {
                    "player_cost": 46,
                    "player_total_points": 30
                },
                "location_in_ui": 1
            },
            {
                "id": 376,
                "first_name": "Nick",
                "last_name": "Pope",
                "web_name": "Pope",
                "position": {
                    "name": "Goalkeeper",
                    "short_name": "GKP"
                },
                "real_team": {
                    "name": "Newcastle",
                    "short_name": "NEW"
                },
                "player_week_log": {
                    "player_cost": 50,
                    "player_total_points": 24
                },
                "location_in_ui": 2
            },
            {
                "id": 306,
                "first_name": "João",
                "last_name": "Cancelo",
                "web_name": "Cancelo",
                "position": {
                    "name": "Defender",
                    "short_name": "DEF"
                },
                "real_team": {
                    "name": "Man City",
                    "short_name": "MCI"
                },
                "player_week_log": {
                    "player_cost": 71,
                    "player_total_points": 31
                },
                "location_in_ui": 3
            },
            {
                "id": 16,
                "first_name": "Gabriel",
                "last_name": "dos Santos Magalhães",
                "web_name": "Gabriel",
                "position": {
                    "name": "Defender",
                    "short_name": "DEF"
                },
                "real_team": {
                    "name": "Arsenal",
                    "short_name": "ARS"
                },
                "player_week_log": {
                    "player_cost": 51,
                    "player_total_points": 26
                },
                "location_in_ui": 4
            },
            {
                "id": 109,
                "first_name": "Joël",
                "last_name": "Veltman",
                "web_name": "Veltman",
                "position": {
                    "name": "Defender",
                    "short_name": "DEF"
                },
                "real_team": {
                    "name": "Brighton",
                    "short_name": "BHA"
                },
                "player_week_log": {
                    "player_cost": 46,
                    "player_total_points": 25
                },
                "location_in_ui": 5
            },
            {
                "id": 285,
                "first_name": "Trent",
                "last_name": "Alexander-Arnold",
                "web_name": "Alexander-Arnold",
                "position": {
                    "name": "Defender",
                    "short_name": "DEF"
                },
                "real_team": {
                    "name": "Liverpool",
                    "short_name": "LIV"
                },
                "player_week_log": {
                    "player_cost": 75,
                    "player_total_points": 23
                },
                "location_in_ui": 6
            },
            {
                "id": 357,
                "first_name": "Kieran",
                "last_name": "Trippier",
                "web_name": "Trippier",
                "position": {
                    "name": "Defender",
                    "short_name": "DEF"
                },
                "real_team": {
                    "name": "Newcastle",
                    "short_name": "NEW"
                },
                "player_week_log": {
                    "player_cost": 51,
                    "player_total_points": 22
                },
                "location_in_ui": 7
            },
            {
                "id": 104,
                "first_name": "Pascal",
                "last_name": "Groß",
                "web_name": "Groß",
                "position": {
                    "name": "Midfielder",
                    "short_name": "MID"
                },
                "real_team": {
                    "name": "Brighton",
                    "short_name": "BHA"
                },
                "player_week_log": {
                    "player_cost": 59,
                    "player_total_points": 37
                },
                "location_in_ui": 8
            },
            {
                "id": 19,
                "first_name": "Gabriel",
                "last_name": "Martinelli Silva",
                "web_name": "Martinelli",
                "position": {
                    "name": "Midfielder",
                    "short_name": "MID"
                },
                "real_team": {
                    "name": "Arsenal",
                    "short_name": "ARS"
                },
                "player_week_log": {
                    "player_cost": 64,
                    "player_total_points": 34
                },
                "location_in_ui": 9
            },
            {
                "id": 28,
                "first_name": "Gabriel",
                "last_name": "Fernando de Jesus",
                "web_name": "Jesus",
                "position": {
                    "name": "Forward",
                    "short_name": "FWD"
                },
                "real_team": {
                    "name": "Arsenal",
                    "short_name": "ARS"
                },
                "player_week_log": {
                    "player_cost": 82,
                    "player_total_points": 32
                },
                "location_in_ui": 13
            },
            {
                "id": 427,
                "first_name": "Harry",
                "last_name": "Kane",
                "web_name": "Kane",
                "position": {
                    "name": "Forward",
                    "short_name": "FWD"
                },
                "real_team": {
                    "name": "Spurs",
                    "short_name": "TOT"
                },
                "player_week_log": {
                    "player_cost": 114,
                    "player_total_points": 31
                },
                "location_in_ui": 14
            },
            {
                "id": 318,
                "first_name": "Erling",
                "last_name": "Haaland",
                "web_name": "Haaland",
                "position": {
                    "name": "Forward",
                    "short_name": "FWD"
                },
                "real_team": {
                    "name": "Man City",
                    "short_name": "MCI"
                },
                "player_week_log": {
                    "player_cost": 119,
                    "player_total_points": 58
                },
                "location_in_ui": 15
            }
        ]
    },
    "success": true
}