<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
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
        'avatar',
        'gender',
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
    
    /*
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }

    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class);
    }

    public function assignRole(string|Role $role): void
    {
        if (is_string($role)) {
            $role = Role::where('role', $role)->firstOrFail();
        }
        $this->roles()->syncWithoutDetaching($role->id);
    }

    public function removeRole(string|Role $role): void
    {
        if (is_string($role)) {
            $role = Role::where('role', $role)->firstOrFail();
        }
        $this->roles()->detach($role->id);
    }

    public function hasRole(string $role): bool
    {
        return $this->roles->contains('role', $role);
    }

    public function hasAnyRole(array $roles): bool
    {
        return $this->roles->whereIn('role', $roles)->isNotEmpty();
    }

    public function syncRoles(array $roles): void
    {
        $roles = Role::whereIn('role', $roles)->pluck('id');
        $this->roles()->sync($roles);
    }
    */
}
