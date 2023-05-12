import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';

function MainApp() {
    return (
        <></>
    )
}

export default MainApp;

if (document.getElementById('mainApp')) {
    const Index = ReactDOM.createRoot(document.getElementById("mainApp"));

    Index.render(
        <React.StrictMode>
            <MainApp/>
        </React.StrictMode>
    )
}