<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngPubPage extends Model
{
    protected $table = 'lng_pub_pages';

    protected $fillable = [
        'title', 'teaser', 'description', 'lang', 'publish_id'
    ];

    public function pubPage(){
        return $this->belongsTo('App\PubPage', 'publish_id');
    }
}
