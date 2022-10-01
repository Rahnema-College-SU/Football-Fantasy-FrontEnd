import {
    choosePlayersListType,
    fantasyTeamApiResponseType,
    myPlayersType,
    playersListApiResponseType,
    playerType
} from "../Types";
import {positionsServer, positionsUi} from "../Variables";

export function toFarsiNumber(number: number) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    return number
        .toString()
        .replace(/\d/g, (x: string) => farsiDigits[parseInt(x)]);
}

export function convertFantasyTeamApiResponseForTransfers(apiResponse: fantasyTeamApiResponseType) {
    return apiResponse.data.playersList.reduce((map: myPlayersType, obj) => {
        map[obj.locationInTransferUI] = {
            id: obj.id,
            webName: obj.webName,
            position: positionsUi[positionsServer.indexOf(obj.position.shortName)],
            team: obj.realTeam.shortName,
            playerWeekLog: {
                playerCost: obj.playerWeekLog.playerCost / 10,
                playerTotalPoints: obj.playerWeekLog.playerTotalPoints / 10
            },
            locationInTransferUI: obj.locationInTransferUI,
            locationInTeamUI: obj.locationInTeamUI
        }

        return map
    }, {})
}

export function convertFantasyTeamApiResponseForMyTeam(apiResponse: fantasyTeamApiResponseType) {
    return apiResponse.data.playersList.reduce((map: myPlayersType, obj) => {
        map[obj.locationInTeamUI] = {
            id: obj.id,
            webName: obj.webName,
            position: positionsUi[positionsServer.indexOf(obj.position.shortName)],
            team: obj.realTeam.shortName,
            playerWeekLog: {
                playerCost: obj.playerWeekLog.playerCost / 10,
                playerTotalPoints: obj.playerWeekLog.playerTotalPoints / 10
            },
            locationInTransferUI: obj.locationInTransferUI,
            locationInTeamUI: obj.locationInTeamUI
        }

        return map
    }, {})
}

export function convertPlayersListApiResponse(apiResponse: playersListApiResponseType): choosePlayersListType {
    const playersList = apiResponse.data.playersList.reduce((array: Array<playerType>, obj) => {
        return [...array, {
            id: obj.id,
            webName: obj.webName,
            position: positionsUi[positionsServer.indexOf(obj.position.shortName)],
            team: obj.realTeam.shortName,
            playerWeekLog: {
                playerCost: obj.playerWeekLog.playerCost / 10,
                playerTotalPoints: obj.playerWeekLog.playerTotalPoints / 10
            },
            locationInTransferUI: undefined,
            locationInTeamUI: undefined
        }]
    }, [])

    return {
        playersList: playersList,
        numberOfPlayers: apiResponse.data.numberOfPlayers,
        numberOfPages: apiResponse.data.numberOfPages
    }
}