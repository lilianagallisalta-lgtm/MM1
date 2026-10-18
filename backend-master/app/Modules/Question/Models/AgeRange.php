<?php

namespace App\Modules\Question\Models;

use Hawk\Support\Database\Eloquent\HkModel;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Translatable\HasTranslations;

class AgeRange extends HkModel
{
    use HasTranslations;

    static $resourceType = 'agesRanges';
    protected $table = 'agesRanges';

    protected $fillable = [
        'display',
        'min',
        'max',
    ];

    protected $casts = [];

    protected $attributes = [];

    public $translatable = [
        'display',
    ];

    /** Relationships */

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }
}
