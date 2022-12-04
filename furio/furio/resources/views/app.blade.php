<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="tag-manager-container-id" content="{{ $tagManagerContainerId }}">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="{{ mix('css/app.css') }}" rel="stylesheet">
        <title>{{ config('app.name') }}</title>
    </head>
    <body class="bg-dark text-light">
        <div id="app">
            <App/>
        </div>
        <script src="{{ mix('js/main.js') }}"></script>
    </body>
</html>
