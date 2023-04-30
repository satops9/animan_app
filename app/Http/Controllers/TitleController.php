<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TitleController extends Controller
{
    public function getTitle(Request $request)
{
    $url = $request->input('url');

    $html = file_get_contents($url);
    preg_match_all('/<h1 id="threadTitle">.*?<\/h1>|>スレッドは.*?頃に落ちます|>このスレッドは過去ログ倉庫に格納されています|setting={.*?}/', $html, $elements);

    $title = preg_replace('/<.*?>/', '', $elements[0][0]);

    return response()->json(['message' => $title]);
}

}
