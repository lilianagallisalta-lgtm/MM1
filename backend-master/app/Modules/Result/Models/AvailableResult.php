<?php

namespace App\Modules\Result\Models;

use Hawk\Support\Database\Eloquent\Traits\HasSchemalessAttributes;
use Hawk\Support\Database\Eloquent\Traits\HasSlugAsIdentifier;
use Hawk\Support\Database\Eloquent\HkModel;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Translatable\HasTranslations;

class AvailableResult extends HkModel
{

    use HasSlugAsIdentifier,
        HasSchemalessAttributes,
        HasTranslations;

    static $resourceType = 'availableResults';
    protected $table = 'availableResults';

    protected $fillable = [
        'result',
        'info',
        'extra_attributes',
        'area_id',
        'subarea_id',
        'ageRange_id',
        'stage_id',
    ];

    protected $casts = [
        'extra_attributes' => 'array',
    ];

    protected $attributes = [];

    public $translatable = [
        'info',
    ];

    /** Relationships */

    public function games(): BelongsToMany
    {
        return $this->belongsToMany(Game::class, 'availableResult_game', 'availableResult_id', 'game_id');
    }

    public function suggestions(): BelongsToMany
    {
        return $this->belongsToMany(Suggestion::class, 'availableResult_suggestion', 'availableResult_id', 'suggestion_id');
    }

}
