<?php

namespace App\Mail;

use App\Models\Message;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMessageReceivedAdmin extends Mailable
{
    use Queueable, SerializesModels;

    public $messageModel;

    public function __construct(Message $message)
    {
        $this->messageModel = $message;
    }

    public function build()
    {
        return $this->subject('New Contact Message - ' . $this->messageModel->subject)
                    ->view('emails.contact.admin_notification');
    }
}
