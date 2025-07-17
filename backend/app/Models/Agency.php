<?php

// app/Models/Agency.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agency extends Model
{
    protected $fillable = [
        'name', 'short_name', 'classification', 'address',
        'head_name', 'head_position', 'contact_details',
        'logo_path', 'is_active',
    ];
}

