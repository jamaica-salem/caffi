use App\Http\Controllers\API\AgencyController;
use App\Http\Controllers\API\AuditorController;

Route::apiResource('agencies', AgencyController::class);
Route::apiResource('auditors', AuditorController::class);
