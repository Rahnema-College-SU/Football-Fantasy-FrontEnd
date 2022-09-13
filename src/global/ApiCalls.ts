import axios from "axios";
import {serverUrl, token} from "./Variables";
import {players} from "./Types";

const customAxios = axios.create(
    {
        baseURL: "http://178.216.248.39:8000",
        timeout: 5000,
        headers: {
            'x-access-token': token
        }
    }
);

export const axiosWeekInf = () => customAxios.get('weekInf')

export const axiosFantasyTeam = () => customAxios.get('fantasyteam', {
})

export const axiosDeletePlayer = (myPlayers: players, selectedPosition: number) => customAxios(
    {
        method: 'put',
        url: serverUrl + '/fantasyteam/player',
        data: {
            player_id: myPlayers[selectedPosition].id
        }
    }
)

export const axiosPlayerList = () => customAxios.get('playerList', {
    // headers: {
    //     "Content-Type": "application/json"
    // },
    params: {
        search: '',
        position: 'ALL',
        player_total_points_sort: 'DESC',
        player_cost_sort: 'DESC',
        page_no: 1,
        list_size: 10
    }
})