<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HtmlController extends Controller
{
    //
    public function getHtml(Request $request) {
        $url = $request->input('url');
        $html = file_get_contents($url);
        return response()->json(['html' => $html]);
    }
    
    
}
