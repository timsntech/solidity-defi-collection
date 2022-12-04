<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class Session extends Controller
{
    /**
     * Invoke.
     *
     * @param Request $request
     */
    public function __invoke(Request $request)
    {
        return $request->session()->get('web3', [
            'wallet' => null,
            'account' => null,
            'connected' => false,
            'address' => [
                'type' => 'addresses',
                'id' => null,
                'attributes' => [
                    'address' => null,
                    'nonce' => null,
                    'logged_in' => false,
                    'name' => null,
                    'email' => null,
                    'email_verified_at' => null,
                    'created_at' => null,
                    'updated_at' => null,
                ],
            ]
        ]);
    }
}
