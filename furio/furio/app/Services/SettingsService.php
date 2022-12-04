<?php

namespace App\Services;

use Illuminate\Support\Str;

class SettingsService
{
    /**
     * Get setting.
     *
     * @param mixed $setting
     * @return mixed
     */
    public static function get($settings)
    {
        $network = env('NETWORK', 'RINKEBY');
        if (is_string($settings)) {
            return static::getSetting($network, $settings);
        }
        if (!is_iterable($settings)) {
            return null;
        }
        $fetched = [];
        foreach ($settings as $setting) {
            $fetched[Str::camel($setting)] = static::getSetting($network, $setting);
        }

        return $fetched;
    }

    /**
     * Get single setting.
     *
     * @param string $network
     * @param string $setting
     * @return mixed
     */
    public static function getSetting(string $network, string $setting)
    {
        $network = strtoupper($network);
        $setting = strtoupper($setting);
        return env($network.'_'.$setting, env($setting));
    }
}
