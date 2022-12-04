<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class UpdateSession extends Controller
{
    /**
     * Invoke.
     *
     * @param Request $request
     */
    public function __invoke(Request $request)
    {
        $request->session()->put('web3', $request->all());

        return $request->session()->get('web3', []);
    }
}
