<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Test Laravel</title>
        @vite(['resources/js/animan_app/css/main.css', 'resources/js/app.ts'])
    </head>
    <body>
        <dev id="appTest"></dev>
    </body>
</html>
