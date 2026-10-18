<?php

namespace App\Modules\Question\Models;

use Hawk\Support\Database\Eloquent\Traits\HasSlugAsIdentifier;
use Hawk\Support\Database\Eloquent\HkModel;
use Spatie\Translatable\HasTranslations;

class AnswerOption extends HkModel
{
    use HasTranslations,
        HasSlugAsIdentifier;

    static $resourceType = 'answerOptions';
    protected $table = 'answerOptions';

    protected $fillable = [
        'slug',
        'display',
    ];

    protected $casts = [];

    protected $attributes = [];

    public $translatable = [
        'display',
    ];
}
