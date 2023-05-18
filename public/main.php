<?php
if (isset($_POST['url'])) {
    $url = $_POST['url'];
    $html = file_get_contents($url);

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

    header('Content-Type: application/json'); // JSONレスポンスを返すためにヘッダーを設定する
    echo json_encode(['metaItems' => $metaItems]);
}
?>
