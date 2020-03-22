<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngPubMember extends Model
{
    protected $table = 'lng_pub_members';

    protected $fillable = [
        'title', 'lang', 'publish_id'
    ];
}
