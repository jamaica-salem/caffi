<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AgencyController;
use App\Http\Controllers\Api\AuditorController;

Route::apiResource('agencies', AgencyController::class);
Route::apiResource('auditors', AuditorController::class);
