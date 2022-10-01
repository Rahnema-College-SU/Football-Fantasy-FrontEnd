import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {RecoilRoot} from "recoil";
import {closeSnackbar, SnackbarProvider} from "notistack";
import {IconButton} from "@mui/material";
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

function getIconVariant() {
    return {
        error: <ErrorOutlineRoundedIcon className={'icon-variant'}/>,
        success: <TaskAltRoundedIcon className={'icon-variant'}/>,
        warning: <WarningAmberRoundedIcon className={'icon-variant'}/>,
        info: <InfoOutlinedIcon className={'icon-variant'}/>,
    }
}

root.render(
    <React.StrictMode>
        <RecoilRoot>
            <BrowserRouter>
                <SnackbarProvider action={snackbarKey => (
                    <IconButton id={'alert-button'} onClick={() => closeSnackbar(snackbarKey)}>
                        <ArrowCircleDownTwoToneIcon htmlColor={'white'}/>
                    </IconButton>
                )} iconVariant={getIconVariant()} maxSnack={5} TransitionProps={{direction: 'up'}}
                                  style={{fontFamily: 'Vazirmatn, serif', direction: 'rtl'}}>
                    <App/>
                </SnackbarProvider>
            </BrowserRouter>
        </RecoilRoot>
    </React.StrictMode>
);

reportWebVitals();
