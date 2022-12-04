<?php

namespace App\Http\Rules;

use App\Models\Address;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\Rule;
use Pelieth\LaravelEcrecover\EthSigRecover;

class ValidSignature implements Rule, DataAwareRule
{
    /**
     * Data.
     *
     * @var array
     */
    protected $data = [];

    /**
     * Message.
     *
     * @var string
     */
    protected $message = 'Invalid signature';

    /**
     * Set data.
     *
     * @param array $data
     * @return self
     */
    public function setData($data)
    {
        $this->data = $data;
        return $this;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if (empty($value)) {
            return false;
        }
        if (!isset($this->data['nonce'])) {
            $this->message = 'Invalid nonce';
            return false;
        }
        if (!isset($this->data['address'])) {
            $this->message = 'Invalid signing address';
        }
        if (!Address::where('address', $this->data['address'])->where('nonce', $this->data['nonce'])) {
            $this->message = 'Invalid signing address';
        }
        $signingAddress = (new EthSigRecover())->personal_ecRecover($this->data['nonce'], $value);

        return strtolower($this->data['address']) === strtolower($signingAddress);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->message;
    }
}
