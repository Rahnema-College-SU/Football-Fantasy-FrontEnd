import {homeTabsEndingUrl, subTabsEndingUrl} from "./Variables";

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

export function getHomeTabsStateId() {
    const tab = sessionStorage.getItem(homeTabsKey)
    return tab ? Number(tab) : 1
}

export function getHomeTabsStateName() {
    const tabsStateId = getHomeTabsStateId()

    return tabsStateId === 1 ? homeTabsEndingUrl.myTeam :
        tabsStateId === 2 ? homeTabsEndingUrl.transfers :
            tabsStateId === 3 ? homeTabsEndingUrl.events :
                tabsStateId === 4 ? homeTabsEndingUrl.profile :
                    homeTabsEndingUrl.prizes
}

const myTeamSubTabKey = 'my-team-sub-tab'

export function setMyTeamSubTabState(tab: number) {
    sessionStorage.setItem(myTeamSubTabKey, String(tab))
}

export function getMyTeamSubTabsStateId() {
    const tab = sessionStorage.getItem(myTeamSubTabKey)
    return tab ? Number(tab) : 1
}

export function getMyTeamSubTabsStateName() {
    return getMyTeamSubTabsStateId() === 1 ? subTabsEndingUrl.schematic : subTabsEndingUrl.list
}

const transfersSubTabKey = 'transfers-sub-tab'

export function setTransfersSubTabState(tab: number) {
    sessionStorage.setItem(transfersSubTabKey, String(tab))
}

export function getTransfersSubTabStateId() {
    const tab = sessionStorage.getItem(transfersSubTabKey)
    return tab ? Number(tab) : 1
}

export function getTransfersSubTabsStateName() {
    return getTransfersSubTabStateId() === 1 ? subTabsEndingUrl.schematic : subTabsEndingUrl.list
}