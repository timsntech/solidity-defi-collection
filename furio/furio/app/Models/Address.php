<?php

namespace App\Models;

use betterapp\LaravelDbEncrypter\Traits\EncryptableDbAttribute;
use Dyrynda\Database\Support\GeneratesUuid;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;

class Address extends Model implements AuthenticatableContract
{
    use Authenticatable, EncryptableDbAttribute, GeneratesUuid;

    /**
     * Fillable attributes.
     *
     * @var array
     */
    protected $fillable = [
        'address',
        'name',
        'email',
    ];

    /**
     * Casted attributes.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Encryptable attributes.
     *
     * @var array
     */
    protected $encryptable = [
        'email_verification_code',
    ];
}
