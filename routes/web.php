<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/{any?}', 'App\Http\Controllers\MainController@index')->where('any', '.*');
Route::post('/read', 'App\Http\Controllers\MainController@read');
Route::post('/create', 'App\Http\Controllers\MainController@create');
Route::post('/update', 'App\Http\Controllers\MainController@update');
Route::post('/delete', 'App\Http\Controllers\MainController@delete');
Route::post('/get-options', 'App\Http\Controllers\MainController@getOptions');
Route::post('/logs', 'App\Http\Controllers\MainController@logs');