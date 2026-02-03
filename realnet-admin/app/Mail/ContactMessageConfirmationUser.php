<?php

namespace App\Mail;

use App\Models\Message;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMessageConfirmationUser extends Mailable
{
    use Queueable, SerializesModels;

    public $messageModel;

    public function __construct(Message $message)
    {
        $this->messageModel = $message;
    }

    public function build()
    {
        return $this->subject('We have received your message - ' . $this->messageModel->subject)
                    ->view('emails.contact.confirmation');
    }
}
