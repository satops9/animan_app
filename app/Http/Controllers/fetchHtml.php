<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class fetchHtml extends Controller
{
    public function index(Request $request)
{
    $url = $request->input('url');

    $options = array(
        'http' => array(
            'method' => 'GET',
            'header' => 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\r\n'
        )
    );
    $context = stream_context_create($options);
    $html = file_get_contents($url, false, $context);

    // HTMLをトリムする処理を記述する

    return response()->json(['html' => $html]);
}

}
