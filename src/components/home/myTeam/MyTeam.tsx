import {Ground, playersState} from "./ground/Ground";
import React, {useEffect, useState} from "react";
import {RemainingPlayer} from "./remainingPlayer/RemainingPlayer";
import {RemainingMoney} from "./remainingMoney/RemainingMoney";
import MiddleTabBar from "./middleTabBar/MiddleTabBar";
import ChoosePlayer from "./choosePlayer/ChoosePlayer";
import DateBax from "./dateBox/DateBox";
import axios from "axios";
import {fantasyTeamApiResponseType, serverUrl, players} from "../../../GlobalVariables";
import {useRecoilState} from "recoil";

function MyTeam() {
    const [fantasyTeamApiResponse, setFantasyTeamApiResponse] = useState<fantasyTeamApiResponseType | undefined>(undefined);
    const [players, setPlayers] = useRecoilState(playersState)

    useEffect(() => updateInfoOfGame(), [])

    useEffect(() => {
        fantasyTeamApiResponse ? setPlayers(convertFantasyTeamApiResponse(fantasyTeamApiResponse)) : setPlayers({})
    }, [fantasyTeamApiResponse])

    const updateInfoOfGame = () => {
        axios.get(`${serverUrl}/fantasyteam`)
            .then(
                res => setFantasyTeamApiResponse(res.data),
                error => {
                    console.log(error)
                    //TODO: create custom alert
                    alert('خطا در دریافت اطّلاعات تیم')
                }
            )
    }

    function convertFantasyTeamApiResponse(apiResponse: fantasyTeamApiResponseType) {
        return apiResponse.data.players_list.reduce((map: players, obj) => {
            map[obj.location_in_ui] = {
                id: obj.id,
                web_name: obj.web_name,
                position: obj.position.short_name,
                player_week_log: {
                    player_cost: obj.player_week_log.player_cost / 10,
                    player_total_points: obj.player_week_log.player_total_points / 10
                },
                location_in_ui: obj.location_in_ui
            }

            return map
        }, {})
    }

    return (
        <div>
            <RemainingPlayer/>
            <RemainingMoney/>
            <MiddleTabBar/>
            <ChoosePlayer/>
            <DateBax/>
            <Ground updateInfoOfGame={updateInfoOfGame}/>
        </div>
    )
}

export default MyTeam