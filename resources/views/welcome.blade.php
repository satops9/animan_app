<!DOCTYPE html>
<html class="h-100" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <link rel="icon" href="https://zatops.sakura.ne.jp/animan_apps/bkm/animan.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Animan_app</title>
        @vite(['resources/js/animan_app/css/main.css', 'resources/js/app.ts'])
    </head>
    <body class="h-100">
        <dev class="weapper">
        <dev id="mainApp"></dev>
        </dev>
    </body>
</html>
