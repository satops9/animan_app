import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

async function getToken() {
    const response = await fetch('/get_csrf_token');
    const token = await response.text();
    return token;
  }

function AppCheck() {
    const [html, setHtml] = useState('');
  
    async function fetchHtml() {
      const token = await getToken();
  
      const res = await fetch('/get_html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token
        },
        body: JSON.stringify({ url: 'https://bbs.animanch.com/board/1862592/' })
      });
  
      const html = await res.text();
      setHtml(html);
    }
  
    useEffect(() => {
      fetchHtml();
    }, []);
  
    return (
      <div dangerouslySetInnerHTML={{ __html: html }} />
    );
  }

export default AppCheck;

if (document.getElementById('appcheck')) {
    const Index = ReactDOM.createRoot(document.getElementById("appcheck"));

    Index.render(
        <React.StrictMode>
            <AppCheck/>
        </React.StrictMode>
    )
}