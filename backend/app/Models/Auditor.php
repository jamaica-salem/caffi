<?php

// app/Models/Auditor.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Auditor extends Model
{
    protected $fillable = [
        'is_external', 'is_active', 'last_name', 'first_name', 'middle_name', 'suffix', 'prefix',
        'position', 'salary', 'agency_id', 'expertise', 'email', 'tin',
        'birthdate', 'contact_no', 'status'
    ];

    public function agency()
    {
        return $this->belongsTo(Agency::class);
    }
}
