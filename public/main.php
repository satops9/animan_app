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

        $doc = new DOMDocument();
        @$doc->loadHTML($html);

        $metaTags = $doc->getElementsByTagName('meta');

        $ogTitle = "";
        $ogDescription = "";
        $ogImage = "";
        $pageTitle = "";

        foreach ($metaTags as $tag) {
            if ($tag->hasAttribute('property')) {
                $property = $tag->getAttribute('property');
                if ($property === 'og:title') {
                    $ogTitle = $tag->getAttribute('content');
                } elseif ($property === 'og:description') {
                    $ogDescription = $tag->getAttribute('content');
                } elseif ($property === 'og:image') {
                    $ogImage = $tag->getAttribute('content');
                }
            }
        }

        if ($doc->getElementsByTagName("title")->length > 0) {
            $pageTitle = $doc->getElementsByTagName("title")[0]->textContent;
        }

        $metaItems = [
            'ogUrl' => $url,
            'ogTitle' => $ogTitle,
            'ogDescription' => $ogDescription,
            'ogImage' => $ogImage,
            'pageTitle' => $pageTitle
        ];

        header('Content-Type: application/json');
        echo json_encode(['metaItems' => $metaItems]);
    } else {
        echo 'Invalid URL'; // URLが無効な場合のエラーハンドリング
    }
}
?>
