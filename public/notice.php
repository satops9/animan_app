<?php
if (isset($_POST['url'])) {
    $url = filter_var($_POST['url'], FILTER_VALIDATE_URL); // URLの検証とクリーンアップ

    if ($url !== false) {
        // セキュリティ対策として、cURLを使用して外部のURLからHTMLを取得する
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $html = curl_exec($ch);
        curl_close($ch);

        echo json_encode(get_res($url));

        function get_res($url){
        // 空の配列を用意
        $box = array();
        for($i = 0; $i < count($url); $i++){
                if($url[$i] != ''){
                    $html = file_get_contents($url[$i]); // URLからHTMLを取得
                    preg_match_all('/<h1 id="threadTitle">.*?<\/h1>|>スレッドは.*?頃に落ちます|>このスレッドは過去ログ倉庫に格納されています|setting={.*?}/', $html, $elements); // HTMLから指定の要素を抽出
                
                    // スレタイを入れる
                    $title = preg_replace('/<.*?>/', '', $elements[0][0]);
                    $box[$i][0] = $title;
                
                    // スレが落ちる時間を入れる
                    $closing_time = str_replace('>', '', $elements[0][1]);
                    $box[$i][1] = $closing_time;
                
                    // 新しいレス番号を入れる
                    $setting = explode(',', $elements[0][2]);
                    $num = preg_replace('/\D/', '', $setting[1]);
                    $box[$i][2] = (int)$num;
                
                    // URLも足す
                    $url_with_res_num = $url[$i]."?res=".$num;
                    $box[$i][3] = $url_with_res_num;
                }
            }
            return $box;
        }
    }else{
        echo 'Invalid URL'; // URLが無効な場合のエラーハンドリング
    }
}
?>