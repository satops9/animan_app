import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [url, setUrl] = useState('');

  async function getToken() {
    const response = await fetch('/get_csrf_token');
    const token = await response.text();
    return token;
  }

  async function handleButtonClick() {
    const token = await getToken();
    const response = await fetch('/get_title', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token
      },
      body: JSON.stringify({url: url})
    });
    const data = await response.json();
    console.log(data.message);
  }

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const handlePaste = (event) => {
    const pastedValue = event.clipboardData.getData('text');
    setUrl(pastedValue);
  };
  
  return (
    <div>
      <input type="text" id="url-input" onChange={handleInputChange} onPaste={handlePaste} />
      <button onClick={handleButtonClick}>取得</button>
    </div>
  );
}

export default App;

if (document.getElementById('app')) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));

    Index.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    )
}