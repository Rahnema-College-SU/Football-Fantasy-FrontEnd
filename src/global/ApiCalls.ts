import axios from "axios";
import {token} from "./Variables";
import {myPlayersType, playerType, searchType} from "./Types";

const customAxios = axios.create(
    {
        baseURL: 'http://178.216.248.39:8000',
        timeout: 5000,
        headers: {
            'x-access-token': token
        }
    }
);

export const axiosWeekInf = () => customAxios.get('weekInf')

export const axiosFantasyTeam = () => customAxios.get('fantasyteam')

export const axiosDeletePlayer = (myPlayers: myPlayersType, selectedPosition: number) => customAxios.put('fantasyteam/player', {
        player_id: myPlayers[selectedPosition].id
    }
)

export const axiosPlayersList = (search: searchType) => customAxios.get('playerList', {
    params: {
        search: search.search,
        position: search.position,
        player_total_points_sort: search.pointsSort,
        player_cost_sort: search.costsSort,
        page_no: search.pageNumber,
        list_size: search.listSize
    }
})

export const axiosAddPlayer = (player: playerType, position: number) => customAxios.post('fantasyteam/player', {
    player_id: player.id,
    location_in_ui: position
})