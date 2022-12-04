<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;

class App extends Controller
{
    /**
     * Invoke.
     */
    public function __invoke()
    {
        return view('app', [
            'tagManagerContainerId' => config('app.tag_manager_container_id'),
            'networkId' => config('app.network_id', 4),
            'networkName' => config('app.network_name', 'Rinkeby Testnet'),
            'rpc' => config('app.rpc', 'https://rpc.mtv.ac'),
            'recaptcha' => config('app.recaptcha'),
            'usdcAddress' => config('app.usdc_address'),
            'usdcAbi' => config('app.usdc_abi'),
            'presaleNftAddress' => config('app.presale_nft_address'),
            'presaleNftAbi' => config('app.presale_nft_abi'),
        ]);
    }
}
