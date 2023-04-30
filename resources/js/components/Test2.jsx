import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function Test2() {
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  const [isAddTagButtonDisabled, setIsAddTagButtonDisabled] = useState(true);

  // URLタイトル取得
  async function getToken() {
    const response = await fetch('/get_csrf_token');
    const token = await response.text();
    return token;
  }

  const handlePaste = (event) => {
    const pastedValue = event.clipboardData.getData('text');
  };

// 入力ボックスが空欄の場合、追加ボタンを無効化する
const handleInputChange = (event) => {
  if (event.target.value === "") {
    setIsAddTagButtonDisabled(true);
  } else {
    setIsAddTagButtonDisabled(false);
  }
  setTagInput(event.target.value);
};

  // スペースキーが押されたとき、タグを追加する
  const handleKeyDown = (event) => {
    if (event.key === " " || event.key === "　") { // スペースキーまたは全角スペースが押された場合
      event.preventDefault();
      addTag();
    }
  };
  
  // タグを追加する関数
  async function addTag() {
    // タグ名の取得
    const url = tagInput.trim();
  
    if (url === "") {
      return;
    }

    console.log(url);

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
    const title = data.message;
    console.log(data.message);
  
    // タグ要素の作成
    const tagElement = {
      name: title,
      url: url,
    };
  
    // タグ要素の追加
    setTags([...tags, tagElement]);
  
    // 入力ボックスのクリア
    setTagInput('');
  }
  

  // 削除ボタンがクリックされたとき、タグを削除する
  const handleRemoveButtonClick = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Example Component</div>

            <div className="card-body">
              <div>
              <input id="tag-input" type="text" placeholder="タグを追加" value={tagInput} onChange={handleInputChange} onPaste={handlePaste} onKeyDown={handleKeyDown} onClick={(event) => event.target.focus()} />
              <button id="add-tag-button" disabled={isAddTagButtonDisabled} onClick={addTag}>タグを追加</button>
              </div>
              <div id="tag-list">
                {tags.map((tag, index) => (
                  <div key={index} className="tag">
                    <a href={tag.url}>{tag.name}</a>
                    <button className="remove-button" onClick={() => handleRemoveButtonClick(index)}>×</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test2;

if (document.getElementById('test2')) {
  const Index = ReactDOM.createRoot(document.getElementById("test2"));

  Index.render(
    <React.StrictMode>
      <Test2/>
    </React.StrictMode>
  )
}