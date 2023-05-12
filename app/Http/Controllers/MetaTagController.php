<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DOMDocument;

class MetaTagController extends Controller
{
    public function getMetaTag(Request $request)
{
    $url = $request->input('url');

    $html = file_get_contents($url);
    $doc = new DOMDocument();
    @$doc->loadHTML($html);
    $metaTags = $doc->getElementsByTagName('meta');

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

    $pageTitle = $doc->getElementsByTagName("title")[0]->textContent;

    $metaItems = [
        'ogUrl' => $url,
        'ogTitle' => $ogTitle,
        'ogDescription' => $ogDescription,
        'ogImage' => $ogImage,
        'pageTitle' => $pageTitle
    ];
    return response()->json(['metaItems' => $metaItems]);
}
}
