import React from "react";
import ReactDOM from 'react-dom/client';
import "./css/main.css";

function Header(){
    return (
        <>
        <div className="weapper">
            <div className="Header">
        <h1>Header</h1>
        </div>
        </div>
        </>
    )
}

export default Header;

if (document.getElementById('header')) {
    const Index = ReactDOM.createRoot(document.getElementById("header"));

    Index.render(
        <React.StrictMode>
            <Header/>
        </React.StrictMode>
    )
}