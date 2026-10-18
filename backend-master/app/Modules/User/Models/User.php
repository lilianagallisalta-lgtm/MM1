<?php

namespace App\Hawk\User\Models;

use App\Modules\RapiTip\Models\RapiTip;
use App\Modules\User\Models\PushToken;
use Dyrynda\Database\Support\GeneratesUuid;
use Hawk\Support\Database\Eloquent\HkAuthenticableModel;
use App\Modules\Child\Models\Child;
use Hawk\Support\Database\Eloquent\Traits\HasSchemalessAttributes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasRoles;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends HkAuthenticableModel implements JWTSubject
{

    use GeneratesUuid,
        Notifiable,
        HasRoles,
        HasSchemalessAttributes;

    protected $resourceType = 'users';
    protected $table = 'users';

    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'country',
        'province',
        'password',
        'picture',
    ];

    protected $casts = [
        'uuid' => 'uuid',
    ];

    protected $hidden = [
        'password',
    ];

    protected $guard_name = 'api';

    /** OneSignal */

    public function routeNotificationForOneSignal()
    {
        return $this->pushTokens()->pluck('token');
    }

    /**
     * Issers
     */

    public function isSuperAdmin()
    {
        return $this->hasRole('sadmin');
    }

    /**
     * Accessors
     */

    public function getNameAttribute()
    {
        return "{$this->attributes['firstname']} {$this->attributes['lastname']}";
    }

    public function getPictureAttribute()
    {
        return \Storage::disk('public')->url('user.svg');
//        return array_get($this->attributes, 'picture') ?? "https://api.adorable.io/avatars/128/{$this->attributes['email']}";
    }

    /** Relationships */

    /**
     * El rol por defecto de un usuario es el primero.
     * @return BelongsTo
     */
    public function role(): Role
    {
        return $this->roles()->first();
    }

    public function children(): HasMany
    {
        return $this->hasMany(Child::class);
    }

    public function pushTokens(): HasMany
    {
        return $this->hasMany(PushToken::class);
    }

    public function rapiTips(): BelongsToMany
    {
        return $this->belongsToMany(RapiTip::class, 'rapiTip_user', 'user_id', 'rapiTip_id');
    }

}
