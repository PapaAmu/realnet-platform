<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #eef2ff; padding: 20px; border-radius: 5px; margin-bottom: 20px; border-left: 4px solid #4f46e5; }
        .details { background: #f9fafb; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .label { font-weight: bold; color: #555; }
        .btn { display: inline-block; padding: 10px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Contact Message</h2>
            <p>A new message has been submitted via the contact form.</p>
        </div>
        
        <div class="details">
            <p><span class="label">Name:</span> {{ $messageModel->name }}</p>
            <p><span class="label">Email:</span> {{ $messageModel->email }}</p>
            <p><span class="label">Subject:</span> {{ $messageModel->subject }}</p>
            <p><span class="label">Date:</span> {{ $messageModel->created_at->format('d M Y, H:i') }}</p>
        </div>
        
        <h3>Message Content</h3>
        <p style="white-space: pre-line;">{{ $messageModel->message }}</p>
        
        <a href="{{ route('filament.admin.resources.messages.view', $messageModel) }}" class="btn">View in Admin Panel</a>
    </div>
</body>
</html>
