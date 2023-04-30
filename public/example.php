<?php
// リクエストボディを読み取り、JSON形式でエンコードされたデータをデコードする
$requestBody = json_decode(file_get_contents('php://input'), true);

// $requestBodyは連想配列として受け取ることができます
$url = $requestBody['url'];

// ... 以下はそのままのコードを使います
$html = file_get_contents($url); // URLからHTMLを取得
preg_match_all('/<h1 id="threadTitle">.*?<\/h1>|>スレッドは.*?頃に落ちます|>このスレッドは過去ログ倉庫に格納されています|setting={.*?}/', $html, $elements); // HTMLから指定の要素を抽出

// スレタイを入れる
$title = preg_replace('/<.*?>/', '', $elements[0][0]);

// JSON形式で返す
echo json_encode(array('message' => $title), JSON_UNESCAPED_UNICODE);
?>
