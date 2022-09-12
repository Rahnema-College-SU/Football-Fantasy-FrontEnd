import axios from "axios";
import {serverUrl, token} from "./Variables";
import {players} from "./Types";

export const axiosWeekInf = () => axios.get(`${serverUrl}/weekInf`)

export const axiosFantasyTeam = () => axios.get(`${serverUrl}/fantasyteam`, {
    headers: {
        'x-access-token': token
    }
})

export const axiosDeletePlayer = (myPlayers: players, selectedPosition: number) => axios(
    {
        method: 'put',
        url: serverUrl + '/fantasyteam/player',
        data: {
            player_id: myPlayers[selectedPosition].id
        },
        headers: {
            'x-access-token': token
        }
    }
)