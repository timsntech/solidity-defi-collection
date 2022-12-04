<?php

use Illuminate\Support\Facades\Route;

// AJAX ROUTES
Route::group([
    'prefix' => 'api/v1',
    'namespace' => '\App\Http\Controllers\Api'
], static function () {
    Route::post('address', 'UpdateAddress');
    Route::post('login', 'Login');
    Route::get('session', 'Session');
    Route::post('session', 'UpdateSession');
    Route::post('logout', 'Logout');
    Route::post('event', 'Event');
    Route::get('settings', 'Settings');
});
// CATCHALL FOR SINGLE PAGE APPLICATION
Route::get('{any}', 'App')->where('any', '.*');
