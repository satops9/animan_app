import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function TestAppModel() {
    const [inputText, setInputText] = useState('');
    const [colors, setColors] = useState('#FFFFFF');

    const handleChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let convertedText;
        if (/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f]/.test(inputText)) {
            // 日本語の場合、英語に変換する処理を実行
            convertedText = inputText.replace(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f]/g, function(s) {
                return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
            });
        } else {
            convertedText = inputText;
        }
        // 英語に変換後、変数colorsに格納
        setColors(convertedText);
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card" style={{backgroundColor: colors}}>
                        <div className="card-header">Example Component</div>

                        <div className="card-body">
                            I'm an example component!
                            <form onSubmit={handleSubmit}>
                                <input type="text" value={inputText} onChange={handleChange} />
                                <button type="submit">送信</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestAppModel;

if (document.getElementById('testappmodel')) {
    const Index = ReactDOM.createRoot(document.getElementById("testappmodel"));

    Index.render(
        <React.StrictMode>
            <TestAppModel/>
        </React.StrictMode>
    )
}