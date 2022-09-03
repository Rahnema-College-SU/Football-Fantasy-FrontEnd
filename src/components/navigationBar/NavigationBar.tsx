import React, {useCallback, useState} from 'react';
import './NavigationBar.css';

function NavigationBar() {
    const tabs = [
        {id: 1, name: 'تیم من'},
        {id: 2, name: 'نقل و انتقالات'},
        {id: 3, name: 'آخرین رویدادها'},
        {id: 4, name: 'پروفایل'},
        {id: 5, name: 'جوایز'}
    ]


    return (
        <Navbar  selectedId={1} onChange={(id) => console.log(id)}>
            <NavbarItem id={1}>تیم من</NavbarItem>
            <NavbarItem id={2}>نقل ، انتقلات</NavbarItem>
        </Navbar>
    );
}


const NavbarContext = React.createContext<{selectedId: number, setSelectedId: (id: number) => void}>({selectedId: 0, setSelectedId: () => {}})


const NavbarItem = ({id, children}: {id: number, children: React.ReactNode}) => {
    const {selectedId, setSelectedId} = React.useContext(NavbarContext);
     return  <li onClick={() => {
         setSelectedId(id)
     }} id={id === selectedId ? "nav-bar-selected": ""}>
         <a id={id === selectedId ? "a-selected": ""}>{children}</a>
     </li>

}


function Navbar({ selectedId, onChange, children}: { selectedId: number, onChange: (id: number) => void, children: React.ReactNode}) {

    const [tab, setTab] = useState(selectedId);

    const setSelectedId = useCallback((id: number) => {
        onChange(id);
        setTab(id);
    }, [onChange]);
    return (
        <NavbarContext.Provider value={{selectedId: tab, setSelectedId}}>
            <div id={'nav-bar-div'}>
                <ul id={'nav-bar-table'}>
                    {children}
                </ul>
            </div>
        </NavbarContext.Provider>
    );

    function getLiId(tabId: number): string | undefined {
        if (tab === tabId) {
            return 'nav-bar-selected';
        }
    }

    function getAId(tabId: number): string | undefined {
        if (tab === tabId) {
            return 'a-selected';
        }
    }
}
export default NavigationBar;