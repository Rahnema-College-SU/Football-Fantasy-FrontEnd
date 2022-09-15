import React, {Dispatch, useEffect, useState} from 'react';
import './ChoosePlayer.css';
import searchIcon from './assets/searchicon.png';
import descSort from './assets/up.svg';
import ascSort from './assets/down.svg';
import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {choosePlayersListType, playerType, positionsUiType, searchType, sortType} from '../../../../global/Types';
import previousLast from './assets/previousl.svg'
import previous from './assets/previous.svg'
import nextLast from './assets/nextl.svg'
import next from './assets/next.svg'
import {
    attPositions,
    defPositions,
    gkPositions,
    midPositions,
    positionsServer,
    positionsUi,
    toFarsiNumber
} from "../../../../global/Variables";
import {selectedPositionState} from "../ground/Ground";
import {myPlayersState} from "../MyTeam";
import {axiosAddPlayer} from "../../../../global/ApiCalls";
import {
    addPlayerError,
    loadPaginationError,
    onAxiosError,
    onAxiosSuccess,
    onBaseError,
    pageNotAvailableError
} from "../../../../global/Errors";
import {debounce} from "ts-debounce";

const defaultSort: sortType = 'DESC'

export const choosePlayersListState = atom<choosePlayersListType>({
    key: 'choosePlayersListState',
    default: {
        playersList: [],
        numberOfPlayers: undefined,
        numberOfPages: undefined
    }
})

export const searchState = atom<searchType>({
    key: 'searchState',
    default: {
        search: '',
        position: 'ALL',
        pointsSort: defaultSort,
        costsSort: defaultSort,
        pageNumber: 1,
        listSize: 10
    }
})

export const selectedPlayerState = atom<playerType | undefined>({
    key: 'selectedPlayerState',
    default: undefined
})

export const selectedFilterItemState = atom<positionsUiType>({
    key: 'selectedFilterItemState',
    default: 'ALL'
})

export const searchTextState = atom<string>({
    key: 'searchTextState',
    default: ''
})

function ChoosePlayerList({playerListApiCall, updateGameInfo}: {
    playerListApiCall: () => void,
    updateGameInfo: () => void
}) {
    let debounceFunction: { (this: ThisParameterType<() => void>, ...args: Parameters<() => void> & any[]): Promise<ReturnType<() => void>>; cancel: (reason?: any) => void }

    const [choosePlayersList, setChoosePlayersList] = useRecoilState(choosePlayersListState)
    const [selectedPlayer, setSelectedPlayer] = useRecoilState(selectedPlayerState)
    const [selectedPosition, setSelectedPosition] = useRecoilState(selectedPositionState)
    const myPlayers = useRecoilValue(myPlayersState)

    const [search, setSearch] = useRecoilState(searchState)
    const [searchText, setSearchText] = useRecoilState(searchTextState)
    const [selectedFilterItem, setSelectedFilterItem] = useRecoilState(selectedFilterItemState)
    const [pointsSort, setPointsSort] = useState<sortType>(defaultSort)
    const [costsSort, setCostsSort] = useState<sortType>(defaultSort)
    const [pageNumber, setPageNumber] = useState<number>(1)

    useEffect(() => {
        setChoosePlayersList({...choosePlayersList, numberOfPlayers: undefined, numberOfPages: undefined})
        playerListApiCall()
    }, [search])

    useEffect(() => {
        setSearch({...search, search: searchText})
    }, [searchText])

    useEffect(() => {
        const serverFilter = positionsServer[positionsUi.indexOf(selectedFilterItem)]

        setSelectedPositionBySelectedFilterItem(selectedFilterItem)
        setSearch({...search, position: serverFilter})
    }, [selectedFilterItem])

    function setSelectedPositionBySelectedFilterItem(filterItem: positionsUiType) {
        function isSelectedPositionInArray(positions: number[]) {
            if (selectedPosition)
                return positions.includes(selectedPosition)
            else
                return false
        }

        function getFirstEmptyPosition(positions: number[]) {
            for (let i = 0; i < positions.length; i++) {
                if (myPlayers[positions[i]] === undefined)
                    return positions[i]
            }

            return undefined
        }

        if (filterItem === 'ALL' && !selectedPosition)
            setSelectedPosition(undefined)
        else if (filterItem === 'GK' && !isSelectedPositionInArray(gkPositions))
            setSelectedPosition(getFirstEmptyPosition(gkPositions))
        else if (filterItem === 'DEF' && !isSelectedPositionInArray(defPositions))
            setSelectedPosition(getFirstEmptyPosition(defPositions))
        else if (filterItem === 'MID' && !isSelectedPositionInArray(midPositions))
            setSelectedPosition(getFirstEmptyPosition(midPositions))
        else if (filterItem === 'ATT' && !isSelectedPositionInArray(attPositions))
            setSelectedPosition(getFirstEmptyPosition(attPositions))
    }

    useEffect(() => {
        setSearch({...search, pointsSort: pointsSort})
    }, [pointsSort])

    useEffect(() => {
        setSearch({...search, costsSort: costsSort})
    }, [costsSort])

    useEffect(() => {
        if (selectedPlayer && !choosePlayersList.playersList.find(player => player.id === selectedPlayer.id))
            setSelectedPlayer(undefined)
    }, [choosePlayersList])

    useEffect(() => {
        if (!selectedPlayer)
            setSelectedPosition(undefined)
        else
            addPlayerApiCall(selectedPlayer)
    }, [selectedPlayer])

    function addPlayerApiCall(player: playerType) {
        if (!selectedPosition) {
            onBaseError({myError: addPlayerError})
            return
        }

        axiosAddPlayer(player, selectedPosition)
            .then(res =>
                    onAxiosSuccess({res: res, myError: addPlayerError, onSuccess: updateGameInfo}),
                err =>
                    onAxiosError({axiosError: err, myError: addPlayerError})
            )
    }

    useEffect(() => {
        setSearch({...search, pageNumber: pageNumber})
    }, [pageNumber])

    function getTitle() {
        return (
            <div id={'players-list-title'}>
                انتخاب بازیکن
            </div>
        )
    }

    function getTextBox() {
        function searchInputOnChange(e: React.ChangeEvent<HTMLInputElement>) {
            if (debounceFunction)
                debounceFunction.cancel()
            //and map last
            debounceFunction = debounce(() => {
                console.log('debounce')
                setSearchText(e.target.value)
            }, 1000)
            debounceFunction().then()
        }

        return (
            <div id={'search-box'}>
                <img id={'search-icon'} src={searchIcon} alt={'magnifier'}/>
                <input id={'search-input'} placeholder={'جستجو'}
                       onChange={searchInputOnChange}/>
            </div>
        )
    }

    function getFilterBar() {
        function filterItemOnCLick(UiFilter: positionsUiType) {
            return () => setSelectedFilterItem(UiFilter)
        }

        return (
            <div id={'filter-bar'}>
                {positionsUi.map((filter) => (
                    <button
                        className={selectedFilterItem === filter ? 'filter-item filter-item-selected' : 'filter-item'}
                        onClick={filterItemOnCLick(filter)}>
                        {filter}
                    </button>
                ))}
            </div>
        );
    }

    function getNumberOfPLayers() {
        return (
            choosePlayersList.numberOfPlayers !== undefined ?
                <div id={'number-of-players-div'}>
                    <text id={'number-of-players'}>{toFarsiNumber(choosePlayersList.numberOfPlayers)}&nbsp;</text>
                    {
                        selectedFilterItem === 'ALL' ? 'بازیکن' :
                            selectedFilterItem === 'GK' ? 'دروازه‌بان' :
                                selectedFilterItem === 'DEF' ? 'مدافع' :
                                    selectedFilterItem === 'MID' ? 'هافبک' : 'مهاجم'
                    } نمایش داده شده است
                </div>
                :
                <div id={'number-of-players-div'}>
                    دریافت بازیکنان ...
                </div>
        )
    }

    function getHeader() {
        function getSortImageTag(sortState: sortType, setSortState: Dispatch<React.SetStateAction<sortType>>) {
            return (
                <img className='sort-icon' src={sortState === 'ASC' ? ascSort : descSort}
                     alt={sortState === 'ASC' ? 'Ascending sort' : 'Descending sort'}
                     onClick={() => {
                         sortState === 'ASC' ? setSortState('DESC') : setSortState('ASC')
                     }}>
                </img>
            )
        }

        function getSortingDiv(sortState: sortType, setSortState: Dispatch<React.SetStateAction<sortType>>, text: string) {
            return (
                <div className={'sorting-div'}>
                    <text className={'choose-player-list-header-text'}>{text}</text>
                    {getSortImageTag(sortState, setSortState)}
                </div>
            )
        }

        return (
            <div className={'players-list-row-div'} style={{border: 'none'}}>
                <text className={'choose-player-list-header-text'}>نام بازیکن</text>
                {getSortingDiv(pointsSort, setPointsSort, 'عملکرد')}
                {getSortingDiv(costsSort, setCostsSort, 'قیمت')}
            </div>
        )
    }

    function getPlayersRow(player: playerType) {
        function getClassName() {
            const staticClassName = 'players-list-row-div exactly-players '

            if (selectedPlayer !== undefined && selectedPlayer.id === player.id)
                return staticClassName + 'players-list-row-div-selected'
            else
                return staticClassName
        }

        function getPlayerRowOnCLick() {
            if (selectedPlayer !== undefined && selectedPlayer.id === player.id)
                setSelectedPlayer(undefined)
            else {
                setSelectedPlayer(player)
                setSelectedPositionBySelectedFilterItem(player.position)
            }
        }

        return (
            <div className={getClassName()} onClick={getPlayerRowOnCLick}>
                <div className={'column-of-names-info'}>
                    <text className={'choose-player-name'}>{player.web_name}</text>
                    <text className={'choose-player-team-name'}>{player.team}</text>
                    <text className={'choose-player-team-name'}>{player.position}</text>
                </div>
                <text
                    className={'choose-player-info'}>{toFarsiNumber(player.player_week_log.player_total_points)}</text>
                <text className={'choose-player-info'}>{toFarsiNumber(player.player_week_log.player_cost)}</text>
            </div>
        )
    }

    function getPageBar() {
        function setNewPage(newPage: number | undefined) {
            return () => {
                if (newPage === undefined || !choosePlayersList.numberOfPages)
                    onBaseError({myError: loadPaginationError})
                else if (newPage < 1 || newPage > choosePlayersList.numberOfPages)
                    onBaseError({myError: pageNotAvailableError})
                else
                    setPageNumber(newPage)
            }
        }

        return (
            <div id='page-bar'>
                <button className='page-bar-icon' onClick={setNewPage(1)}>
                    <img src={previousLast} alt='previous last pages'/>
                    <img src={previousLast} alt='previous last pages'/>
                </button>
                <button className='page-bar-icon' onClick={setNewPage(pageNumber - 1)}>
                    <img src={previous} alt='previous page'/>
                </button>
                {
                    choosePlayersList && choosePlayersList.numberOfPages ?
                        <text
                            id={'show-page-state'}>صفحه‌ی {toFarsiNumber(pageNumber)} از {toFarsiNumber(choosePlayersList.numberOfPages)}</text>
                        :
                        <text id={'show-page-state'}>دریافت تعداد صفحات ...</text>
                }

                <button className='page-bar-icon' onClick={setNewPage(pageNumber + 1)}>
                    <img src={next} alt='next page'/>
                </button>
                <button className='page-bar-icon' onClick={setNewPage(choosePlayersList.numberOfPages)}>
                    <img src={nextLast} alt='next last pages'/>
                    <img src={nextLast} alt='next last pages'/>
                </button>
            </div>
        )
    }

    return (
        <div id={'players-list-main-div'}>
            {getTitle()}
            {getTextBox()}
            {getFilterBar()}
            {getNumberOfPLayers()}
            <div id='players-list'>
                {getHeader()}
                {choosePlayersList.playersList.map((player) => getPlayersRow(player))}
            </div>
            {getPageBar()}
        </div>
    );
}

export default ChoosePlayerList;
