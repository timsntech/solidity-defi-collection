<?php

namespace App\Http\Controllers\Api;

use App\Events\BroadcastEvent;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class Event extends Controller
{
    /**
     * Invoke.
     */
    public function __invoke(Request $request)
    {
        if ($message = $request->get('message')) {
            event(new BroadcastEvent($message));
        }
        return '';
    }
}
