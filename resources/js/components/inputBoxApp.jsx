import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function inputBoxApp() {
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  // 入力ボックスが空欄の場合、追加ボタンを無効化する
  const handleInputChange = (event) => {
    if (event.target.value === "") {
      addTagButton.disabled = true;
    } else {
      addTagButton.disabled = false;
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
  function addTag() {
    // タグ名の取得
    const tagName = tagInput.trim(); // スペースキーによる入力を認識するため、前後の空白文字を削除する

    if (tagName === "") { // タグ名が空欄の場合は何もしない
      return;
    }

    // タグ要素の作成
    const tagElement = {
      name: tagName,
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
                <input id="tag-input" type="text" placeholder="タグを追加" value={tagInput} onChange={handleInputChange} onKeyDown={handleKeyDown} />
                <button id="add-tag-button" disabled={!tagInput}>タグを追加</button>
              </div>
              <div id="tag-list">
                {tags.map((tag, index) => (
                  <div key={index} className="tag">
                    <span>{tag.name}</span>
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

export default inputBoxApp;

if (document.getElementById('inputboxapp')) {
  const Index = ReactDOM.createRoot(document.getElementById("inputboxapp"));

  Index.render(
    <React.StrictMode>
      <inputBoxApp/>
    </React.StrictMode>
  )
}