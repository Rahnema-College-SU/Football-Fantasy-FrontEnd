const tokenKey = 'x-access-token'

export function setToken(t: string) {
    localStorage.setItem(tokenKey, t)
}

export function getToken() {
    return localStorage.getItem(tokenKey)
}

const homeTabsKey = 'home-tabs'

export function setHomeTabsState(tab: number) {
    sessionStorage.setItem(homeTabsKey, String(tab))
}

export function getHomeTabsState() {
    const tab = sessionStorage.getItem(homeTabsKey)
    return tab ? Number(tab) : 1
}

const showingMyTeamTabsKey = 'showing-my-team-tabs'

export function setShowingMyTeamTabsState(tab: number) {
    sessionStorage.setItem(showingMyTeamTabsKey, String(tab))
}

export function getShowingMyTeamTabsState() {
    const tab = sessionStorage.getItem(showingMyTeamTabsKey)
    return tab ? Number(tab) : 1
}