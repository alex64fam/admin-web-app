<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'phone',
        'address',
        'city',
        'state',
        'country',
        'zip',
        'birthdate',
        'latitude',
        'longitude',
        'language_id',
        'avatar',
        'gender_id',
        'is_active',
        'description',
        'password',
        'created_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function gender(): BelongsTo
    {
        return $this->belongsTo(Gender::class);
    }

    public function languages(): BelongsTo
    {
        return $this->belongsTo(Language::class);
    }

    public function couplesAsUserOne(): HasMany
    {
        return $this->hasMany(Couple::class, 'user_id_1');
    }

    public function couplesAsUserTwo(): HasMany
    {
        return $this->hasMany(Couple::class, 'user_id_2');
    }

    public function couples()
    {
        return $this->couplesAsUserOne->merge($this->couplesAsUserTwo);
    }

    public function couple(): Couple
    {
        return $this->couplesAsUserOne->merge($this->couplesAsUserTwo)->first();
    }

    // Devuelve el usuario de la pareja
    public function userCouple(): User
    {
        $couple = $this->couplesAsUserOne->merge($this->couplesAsUserTwo)->first()->load(['userOne', 'userTwo', 'relationshipStatus']);
        if ($couple->userOne->id === $this->id) return $couple->userOne;
        return $couple->userTwo;
    }
}
