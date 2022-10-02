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

export const axiosWeekInf = () => customAxios.get('week_info')

export const axiosFantasyTeam = () => customAxios.get('fantasyteam')

export const axiosDeletePlayer = (transfersPlayers: myPlayersType, transfersSelectedPosition: number) => customAxios.delete(`fantasyteam/player/${transfersPlayers[transfersSelectedPosition].id}`, {
        data: {
            playerId: transfersPlayers[transfersSelectedPosition].id
        }
    }
)

export const axiosPlayersList = (search: searchType) => customAxios.get('player_list', {
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
    playerId: player.id,
    locationInTransferUI: position
})

export const axiosSignUp = (username: string, password: string, firstName: string, lastName: string, email: string, country: string) => customAxios.post('signup',
    {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
        country: country,
        birthDate: "2002-09-16"//TODO
    }
)
export const axiosSignUpConfirm = (token: string, code: string) => customAxios.post('verification', {
        verificationCode: code
    }
)

export const axiosSignIn = (username: string, password: string) => customAxios.post('login', {
        username: username,
        password: password
    }
)

export const axiosAllUsersList = (searchText: string) => customAxios.get('user_search', {
    params: {
        search: searchText,
        search_type: "All"
    }
})

export const axiosFollow = (id: String) => customAxios.post('follow', {
    params: {
        followUserId: id
    }
})
export const axiosUnfollow = (id: String) => customAxios.delete(`follow/"${id}"`)

export const axiosFollowingSearch = (searchText: string) => customAxios.get('user_search', {
    params: {
        search: searchText,
        search_type: "Following"
    }
})

export const axiosFollowerSearch = (searchText: string) => customAxios.get('user_search', {
    params: {
        search: searchText,
        search_type: "Follower"
    }
})
export const axiosSignInWithToken = () => customAxios.get('login_with_token')

export const axiosSubstitution = (playerOutId: number, playerInId: number) => customAxios.post('substitution', {
    playerOutId: playerOutId,
    playerInId: playerInId
})

export const axiosUserInfo = (id: string) => customAxios.get('user_info',
    {
        params: {
            user_id:id
        }
    }
)

export const axiosEventList = () => customAxios.get('event_list')

export const axiosLike = (eventId: string) => customAxios.post('like', {
    eventId: eventId
})

export const axiosUnlike = (eventId: string) => customAxios.delete(`unlike/${eventId}`)