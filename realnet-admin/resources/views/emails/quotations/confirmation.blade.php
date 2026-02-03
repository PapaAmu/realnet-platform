<!DOCTYPE html>
<html>
<head>
    <title>Quotation Received</title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
        .footer { font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Quotation Request Received</h2>
        </div>
        <p>Hello {{ $quotation->name }},</p>
        <p>Thank you for requesting a quote for <strong>{{ $quotation->service }}</strong>.</p>
        <p>We have successfully received your project details and our team has started the analysis process.</p>
        
        <p><strong>Your Reference:</strong> {{ $quotation->quotation_number }}</p>
        
        <h3>What happens next?</h3>
        <ul>
            <li>Our team will review your requirements.</li>
            <li>We may contact you if we need any clarification.</li>
            <li>You will receive a detailed proposal within 24-48 hours.</li>
        </ul>
        
        <p>If you have any urgent questions, please reply to this email.</p>
        
        <br>
        <p>Best regards,</p>
        <p><strong>Realnet Web Solutions Team</strong></p>
        
        <div class="footer">
            <p>&copy; {{ date('Y') }} Realnet Web Solutions. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
