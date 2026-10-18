<?php

namespace App\Modules\Stage\Models;

use App\Modules\Child\Models\Child;
use App\Modules\Question\Models\AgeRange;
use App\Modules\Question\Models\Question;
use Hawk\Price\Traits\HasPrices;
use Hawk\Support\Database\Eloquent\HkModel;
use Hawk\Support\Database\Eloquent\Traits\HasSlugAsIdentifier;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Translatable\HasTranslations;

class Stage extends HkModel
{

    use HasSlugAsIdentifier,
        HasTranslations,
        HasPrices;

    protected $table = 'stages';
    public static $resourceType = 'stages';

    protected $fillable = [
        'slug',
        'display',
    ];

    protected $casts = [];

    protected $attributes = [];

    public $translatable = [
        'display',
    ];

    /** Scopes */


    /**
     * Filtra las etapas que son para un determinado niño (pueden ser X etapas,
     * según la edad del niño).
     * @param Builder $builder
     * @param Child   $child
     *
     * @return mixed
     */
    public function scopeForChild(Builder $builder, Child $child)
    {
        return $builder->whereHas('questions', function ($query) use ($child) {
            return $query->where('ageRange_id', '=', $child->ageRange->id);
        });
    }

    public function scopeByAgeRange(Builder $builder, AgeRange $ageRange)
    {
        return $builder->whereHas('questions', function ($query) use ($ageRange) {
            return $query->where('ageRange_id', '=', $ageRange->id);
        });
    }

    /** Relationships */

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }

}
