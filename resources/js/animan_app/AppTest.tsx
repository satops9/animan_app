import React from "react";
import ReactDOM from 'react-dom/client';
import "./css/main.css";

function AppTest(){
    return (
        <>
        <div className="weapper">
            <div className="main">
        <h1>App Test</h1>
        </div>
        </div>
        </>
    )
}

export default AppTest;

if (document.getElementById('appTest')) {
    const Index = ReactDOM.createRoot(document.getElementById("appTest"));

    Index.render(
        <React.StrictMode>
            <AppTest/>
        </React.StrictMode>
    )
}