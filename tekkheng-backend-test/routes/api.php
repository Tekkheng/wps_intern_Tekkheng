<?php

use App\Http\Controllers\DailyLogController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    "middleware" => ["auth:api"],
], function () {

    Route::get("profile", [UsersController::class, "profile"]);
    Route::get("refresh", [UsersController::class, "refreshToken"]);
    Route::delete("logout", [UsersController::class, "logout"]);

    Route::get('/login', [UsersController::class, 'index'])->withoutMiddleware(['auth:api']);
    Route::post("register", [UsersController::class, "register"])->withoutMiddleware(['auth:api']);
    Route::post("login", [UsersController::class, "login"])->withoutMiddleware(['auth:api']);

    Route::get("log", [ DailyLogController::class, "index"]);
    Route::get("log/{id}", [ DailyLogController::class, "show"]);
    Route::post("log", [ DailyLogController::class, "create"]);
    Route::put("log/{id}", [ DailyLogController::class, "update"]);
    Route::delete("log/{id}", [ DailyLogController::class, "destroy"]);

    Route::put("logStatus/{id}", [DailyLogController::class, "updateStatus"]);
    
    // Route::get("generate-pdf/{id}", [PdfController::class, "generate_pdf"]);

    // Route::get("mail/{id}", [MailController::class, "schedule_pdf"]);
    
    // Route::post('send-email', [MailController::class, 'send_email']);

    // Route::get('/download-pdf/{id}', [MailController::class, 'downloadPdf'])->name('download-pdf');
});
