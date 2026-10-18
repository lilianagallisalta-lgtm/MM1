<?php

namespace App\Modules\Membership\Notifications;

use App\Modules\RapiTip\Models\RapiTip;
use Illuminate\Notifications\Notification;
use NotificationChannels\OneSignal\OneSignalChannel;
use NotificationChannels\OneSignal\OneSignalMessage;

class RapiTipPushNotification extends Notification
{

    protected $rapiTip;

    public function __construct(RapiTip $rapiTip)
    {
        $this->rapiTip = $rapiTip;
    }

    public function via($notifiable)
    {
        return [OneSignalChannel::class];
    }

    public function toOneSignal($notifiable)
    {
        $this->rapiTip->users()->attach($notifiable); // TODO: Ver donde poner esto
        return OneSignalMessage::create()
            ->subject("¡Rapi Tip de la semana!")
            ->body($this->rapiTip->title)
            ->setImageAttachments($this->rapiTip->picture)
            ->url("https://mentesmejorando.com/rapitips/{$this->rapiTip->uuid}");
    }

}
