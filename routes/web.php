<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\fetchHtml;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
///layouts/app
Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/get_csrf_token', function() {
    return csrf_token();
});

Route::post('/get_title', 'App\Http\Controllers\TitleController@getTitle');
Route::post('/get_metatag', 'App\Http\Controllers\MetaTagController@getMetaTag');
Route::post('/get_html', 'App\Http\Controllers\HtmlController@getHtml');


