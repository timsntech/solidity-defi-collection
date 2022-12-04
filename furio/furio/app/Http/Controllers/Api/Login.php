<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\AddressResource;
use App\Models\Address;
use App\Http\Rules\ValidSignature;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

class Login extends Controller
{
    /**
     * Invoke.
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'address' => 'required|exists:addresses,address',
            'nonce' => 'required',
            'signature' => [
                'required',
                new ValidSignature,
            ],
        ]);
        if (!$address = Address::where('address', $request->get('address'))->first()) {
            abort(404);
        }
        Auth::login($address);
        $address->logged_in = true;

        return AddressResource::make($address);
    }
}
