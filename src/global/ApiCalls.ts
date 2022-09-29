import axios from "axios";
import {myPlayersType, playerType, searchType} from "./Types";
import {getToken} from "./Storages";

const customAxios = axios.create(
    {
        baseURL: 'http://178.216.248.39:8000',
        timeout: 5000
    }
);

customAxios.interceptors.request.use(config => ({
    ...config,
    headers: {
        ...config.headers,
        'x-access-token': getToken()
    }
}))

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

export const axiosSignUp = (Username: string, Password: string, First_name: string, Last_name: string, Email: string, Country: string) => customAxios.post('signup',
    {
        username: Username,
        password: Password,
        first_name: First_name,
        last_name: Last_name,
        email: Email,
        country: Country
    }
)
export const axiosSignUpConfirm = (token: string, code: string) => customAxios.post('verification', {
        verification_code: code
    }
)

export const axiosSignIn = (username: string, password: string) => customAxios.post('login',
    {
        username: username,
        password: password
    }
)

export const axiosAllUsersList = (searchText: string) => customAxios.get('user_search', {
    params: {
        search: searchText,
        search_type:"All"
    }
})