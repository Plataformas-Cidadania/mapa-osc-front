<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngDftMember extends Model
{
    protected $table = 'lng_dft_members';

    protected $fillable = [
        'title', 'lang', 'draft_id'
    ];
}
