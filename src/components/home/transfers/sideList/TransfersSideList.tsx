import React, {Dispatch, useEffect, useState} from 'react';
import './TransfersSideList.css';
import searchIcon from './assets/searchicon.svg';
import descSort from './assets/up.svg';
import ascSort from './assets/down.svg';
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
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
import {selectedPositionState} from "../schematic/Schematic";
import {myPlayersState} from "../Transfers";
import {addPlayerError, loadPaginationError, onBaseError, pageNotAvailableError} from "../../../../global/Errors";
import {debounce} from "ts-debounce";
import {removePlayerModalDisplayState} from "../removePlayerModal/RemovePlayerModal";
import {TransfersSideListPlayer} from "../../player/transfersPlayer/sideList/TransfersSideListPlayer";
import {useMediaQuery} from "@mui/material";
// import {useMediaQuery} from "../../../../global/functions/CustomHooks";

const defaultSort: sortType = 'DESC'

export const transfersSideListState = atom<choosePlayersListType>({
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

function TransfersSideList({playerListApiCall, addPlayerApiCall}: {
    playerListApiCall: () => void,
    addPlayerApiCall: (player: playerType, selectedPosition: number) => void
}) {
    let debounceFunction: { (this: ThisParameterType<() => void>, ...args: Parameters<() => void> & any[]): Promise<ReturnType<() => void>>; cancel: (reason?: any) => void }

    const [transfersSideList, setTransfersSideList] = useRecoilState(transfersSideListState)
    const [selectedPlayer, setSelectedPlayer] = useRecoilState(selectedPlayerState)
    const [selectedPosition, setSelectedPosition] = useRecoilState(selectedPositionState)
    const myPlayers = useRecoilValue(myPlayersState)
    const setRemovePlayerModalDisplay = useSetRecoilState(removePlayerModalDisplayState)

    const [search, setSearch] = useRecoilState(searchState)
    const [searchText, setSearchText] = useRecoilState(searchTextState)
    const [selectedFilterItem, setSelectedFilterItem] = useRecoilState(selectedFilterItemState)
    const [pointsSort, setPointsSort] = useState<sortType>(defaultSort)
    const [costsSort, setCostsSort] = useState<sortType>(defaultSort)
    const [pageNumber, setPageNumber] = useState<number>(1)

    const playersListStyle = document.getElementById('players-list-main-div')?.style
    const matches = useMediaQuery('(max-width: 768px)')

    useEffect(() => {
        setTransfersSideList({...transfersSideList, numberOfPlayers: undefined, numberOfPages: undefined})
        playerListApiCall()
    }, [search])

    useEffect(() => {
        setPageNumber(1)
        setSearch({...search, search: searchText})
    }, [searchText])

    useEffect(() => {
        const serverFilter = positionsServer[positionsUi.indexOf(selectedFilterItem)]

        setPageNumber(1)
        setSearch({...search, position: serverFilter})
    }, [selectedFilterItem])

    useEffect(() => {
        if (matches)
            playersListStyle?.setProperty('display', 'none')
        else
            playersListStyle?.setProperty('display', 'flex')
    }, [matches])

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

            return positions[0]
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
        setPageNumber(1)
        setSearch({...search, pointsSort: pointsSort})
    }, [pointsSort])

    useEffect(() => {
        setPageNumber(1)
        setSearch({...search, costsSort: costsSort})
    }, [costsSort])

    useEffect(() => {
        if (selectedPlayer && !transfersSideList.playersList.find(player => player.id === selectedPlayer.id))
            setSelectedPlayer(undefined)

        if (transfersSideList.playersList.length === 0 && transfersSideList.numberOfPages)
            setPageNumber(transfersSideList.numberOfPages)
    }, [transfersSideList])

    useEffect(() => {
        if (selectedPlayer)
            addPlayer(selectedPlayer)
    }, [selectedPlayer])

    function addPlayer(player: playerType) {
        if (!selectedPosition) {
            onBaseError({myError: addPlayerError})
        } else if (myPlayers[selectedPosition] !== undefined)
            setRemovePlayerModalDisplay('block')
        else
            addPlayerApiCall(player, selectedPosition)
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
            return () => {
                setSelectedFilterItem(UiFilter)
                setSelectedPositionBySelectedFilterItem(UiFilter)
            }
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
            transfersSideList.numberOfPlayers !== undefined ?
                <div id={'number-of-players-div'}>
                    <div id={'number-of-players'}>{toFarsiNumber(transfersSideList.numberOfPlayers)}&nbsp;</div>
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
                    <div className={'choose-player-list-header-text'}>{text}</div>
                    {getSortImageTag(sortState, setSortState)}
                </div>
            )
        }

        return (
            <div className={'players-list-row-div'} style={{border: 'none'}}>
                <div className={'choose-player-list-header-text'}>نام بازیکن</div>
                {getSortingDiv(pointsSort, setPointsSort, 'عملکرد')}
                {getSortingDiv(costsSort, setCostsSort, 'قیمت')}
            </div>
        )
    }

    function getPageBar() {
        function setNewPage(newPage: number | undefined) {
            return () => {
                if (newPage === undefined || !transfersSideList.numberOfPages)
                    onBaseError({myError: loadPaginationError})
                else if (newPage < 1 || newPage > transfersSideList.numberOfPages)
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
                    transfersSideList && transfersSideList.numberOfPages ?
                        <div
                            id={'show-page-state'}>صفحه‌ی {toFarsiNumber(pageNumber)} از {toFarsiNumber(transfersSideList.numberOfPages)}</div>
                        : transfersSideList.numberOfPages === 0 ?
                            <div id={'show-page-state'}>ناموجود</div> :
                            <div id={'show-page-state'}>دریافت تعداد صفحات ...</div>
                }

                <button className='page-bar-icon' onClick={setNewPage(pageNumber + 1)}>
                    <img src={next} alt='next page'/>
                </button>
                <button className='page-bar-icon' onClick={setNewPage(transfersSideList.numberOfPages)}>
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
                {transfersSideList.playersList.map(player => <TransfersSideListPlayer player={player}
                                                                                      setSelectedPositionBySelectedFilterItem={setSelectedPositionBySelectedFilterItem}/>)}
            </div>
            {getPageBar()}
        </div>
    );
}

export default TransfersSideList;
