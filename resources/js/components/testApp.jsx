import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function testApp() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">testApp2</div>

                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default testApp;

if (document.getElementById('testapp')) {
    const Index = ReactDOM.createRoot(document.getElementById("testapp"));

    Index.render(
        <React.StrictMode>
            <testApp/>
        </React.StrictMode>
    )
}