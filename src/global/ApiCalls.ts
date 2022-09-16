import axios from "axios";
import {serverUrl, getToken} from "./Variables";
import {players} from "./Types";

const customAxios = axios.create(
    {
        baseURL: "http://178.216.248.39:8000",
        timeout: 5000
    }
);

export const axiosWeekInf = () => customAxios.get('weekInf')

export const axiosFantasyTeam = () => customAxios.get('fantasyteam', {
    headers: {
        'x-access-token': getToken()
    }
})

export const axiosDeletePlayer = (myPlayers: players, selectedPosition: number) => customAxios(
    {
        method: 'put',
        url: serverUrl + '/fantasyteam/player',
        data: {
            player_id: myPlayers[selectedPosition].id
        },
        headers: {
            'x-access-token': getToken()
        }
    }
)

export const axiosPlayerList = () => customAxios.get('playerList', {
    headers: {
        "Content-Type": "application/json"
    },
    params: {
        search: '',
        position: 'ALL',
        player_total_points_sort: 'DESC',
        player_cost_sort: 'DESC',
        page_no: 1,
        list_size: 10
    }
})

export const axiosSignUp = (Username:string,Password:string,First_name:string,Last_name:string,Email:string,Country:string) => customAxios.post('signup', 
    {
        username:Username,
        password:Password,
        first_name:First_name,
        last_name:Last_name,
        email:Email,
        country:Country
    }
)
export const axiosSignUpConfirm =(token:string,code:string)=>customAxios.post('verification',
{verification_code:code},{headers: {"x-access-token":token}})

export const axiosSignIn=(username:string,password:string)=>customAxios.post('login',
{username:username,
password:password
}
)
