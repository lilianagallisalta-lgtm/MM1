<?php

namespace App\Modules\Result\Models;

use Hawk\Support\Database\Eloquent\Traits\HasSchemalessAttributes;
use Hawk\Support\Database\Eloquent\Traits\HasSlugAsIdentifier;
use Hawk\Support\Database\Eloquent\HkModel;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Translatable\HasTranslations;

class Suggestion extends HkModel
{
    use HasSlugAsIdentifier,
        HasSchemalessAttributes,
        HasTranslations;

    static $resourceType = 'suggestions';
    protected $table = 'suggestions';

    protected $fillable = [
        'title',
        'body',
        'extra_attributes',
    ];

    protected $casts = [
        'extra_attributes' => 'array',
    ];

    protected $attributes = [];

    public $translatable = [
        'title',
        'body',
    ];

    /** Relationships */

    public function availableResults(): BelongsToMany
    {
        return $this->belongsToMany(AvailableResult::class, 'availableResult_suggestion', 'suggestion_id', 'availableResult_id');
    }
}
