<?php

namespace App\Http\Controllers\Api;

use App\Services\SettingsService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class Settings extends Controller
{
    /**
     * Invoke.
     *
     * @param Request $request
     */
    public function __invoke(Request $request)
    {
        $settings = SettingsService::get([
            'network_id',
            'network_name',
            'rpc_url',
            'recaptcha',
            'usdc_address',
            'usdc_abi',
            'presale_nft_address',
            'presale_nft_abi',
            'token_address',
            'token_abi',
            'swap_address',
            'swap_abi',
            'downline_nft_address',
            'downline_nft_abi',
        ]);
        $settings = array_merge($settings, $request->session()->get('web3', [
            'wallet' => null,
            'account' => null,
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
        ]));

        return response()->json($settings);
    }
}
