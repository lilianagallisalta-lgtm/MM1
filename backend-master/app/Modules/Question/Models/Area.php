<?php

namespace App\Modules\Question\Models;

use Hawk\Support\Database\Eloquent\Traits\HasSlugAsIdentifier;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Hawk\Support\Database\Eloquent\HkModel;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class Area extends HkModel
{
    use HasSlug,
        HasTranslations,
        HasSlugAsIdentifier;

    static $resourceType = 'areas';
    protected $table = 'areas';

    protected $fillable = [
        'name',
        'picture',
    ];

    protected $casts = [];

    protected $attributes = [];

    public $translatable = [
        'name',
    ];

    public function generateNonUniqueSlug()
    {
        return Str::slug($this->translate('name', 'es_AR'));
    }

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->saveSlugsTo('slug');

    }

    /** Relationships */

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class, 'area_id');
    }

    public function subareas(): HasMany
    {
        return $this->hasMany(Subarea::class);
    }

}
