import React from "react";
import {MyTeamSchematicPlayer} from "./myTeamPlayer/MyTeamSchematicPlayer";
import {MyTeamListPlayer} from "./myTeamPlayer/MyTeamListPlayer";
import {TransfersSchematicPlayer} from "./transfersPlayer/TransfersSchematicPlayer";
import {TransfersListPlayer} from "./transfersPlayer/TransfersListPlayer";

export function Player({
                           clothTab,
                           clothType,
                           isSelected,
                           isActive
                       }: { clothTab: 'myTeam' | 'transfers', clothType: 'schematic' | 'list', isSelected: boolean, isActive: boolean }) {

    return (
        clothTab === 'myTeam' ?
            clothType === 'schematic' ? <MyTeamSchematicPlayer isSelected={isSelected} isActive={isActive}/> :
                <MyTeamListPlayer isSelected={isSelected} isActive={isActive}/>
            :
            clothType === 'schematic' ? <TransfersSchematicPlayer isSelected={isSelected} isActive={isActive}/> :
                <TransfersListPlayer isSelected={isSelected} isActive={isActive}/>
    )
}