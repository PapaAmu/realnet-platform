<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #eef2ff; padding: 20px; border-radius: 5px; margin-bottom: 20px; border-left: 4px solid #4f46e5; }
        .footer { margin-top: 30px; font-size: 0.9em; color: #777; border-top: 1px solid #eee; padding-top: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Thank you for contacting us!</h2>
            <p>Hi {{ $messageModel->name }},</p>
        </div>
        
        <p>We have received your message regarding "<strong>{{ $messageModel->subject }}</strong>".</p>
        
        <p>Our team will review your message and get back to you as soon as possible.</p>
        
        <p>Here is a copy of your message:</p>
        <blockquote style="background: #f9f9f9; padding: 15px; border-left: 3px solid #ccc;">
            {{ $messageModel->message }}
        </blockquote>
        
        <div class="footer">
            <p>Best regards,<br>RealNet Team</p>
        </div>
    </div>
</body>
</html>
