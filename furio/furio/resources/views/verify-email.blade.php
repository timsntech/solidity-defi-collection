@component('mail::message')
# Email Verification

Your email verification code is <strong>{{ $code }}</strong>

Thanks,<br>
{{ config('app.name') }}
@endcomponent
