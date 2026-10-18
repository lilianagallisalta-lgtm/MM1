<?php

namespace App\Modules\Result\Models;

use Hawk\Support\Database\Eloquent\Traits\HasSchemalessAttributes;
use Hawk\Support\Database\Eloquent\Traits\HasSlugAsIdentifier;
use Hawk\Support\Database\Eloquent\HkModel;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Translatable\HasTranslations;

class Game extends HkModel
{
    use HasSlugAsIdentifier,
        HasSchemalessAttributes,
        HasTranslations;

    static $resourceType = 'games';
    protected $table = 'games';

    protected $fillable = [
        'title',
        'body',
        'materials',
        'extra_attributes',
    ];

    protected $casts = [
        'extra_attributes' => 'array',
    ];

    protected $attributes = [];

    public $translatable = [
        'title',
        'body',
        'materials',
    ];

    /** Relationships */

    public function availableResults(): BelongsToMany
    {
        return $this->belongsToMany(AvailableResult::class, 'availableResult_game', 'game_id', 'availableResult_id');
    }
}
