<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quotation {{ $quotation->quotation_number }}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #025a62 0%, #038c8c 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .header p {
            margin: 10px 0 0;
            opacity: 0.9;
        }
        .content {
            padding: 30px;
        }
        .greeting {
            font-size: 18px;
            color: #025a62;
            margin-bottom: 20px;
        }
        .quotation-box {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #025a62;
        }
        .quotation-box h3 {
            margin: 0 0 15px;
            color: #025a62;
        }
        .quotation-detail {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .quotation-detail:last-child {
            border-bottom: none;
        }
        .quotation-detail .label {
            color: #666;
        }
        .quotation-detail .value {
            font-weight: 600;
            color: #333;
        }
        .total-amount {
            background: #025a62;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
        }
        .total-amount .label {
            font-size: 14px;
            opacity: 0.9;
        }
        .total-amount .amount {
            font-size: 32px;
            font-weight: 700;
            margin-top: 5px;
        }
        .validity-notice {
            background: #e3f2fd;
            border: 1px solid #2196f3;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
            color: #1565c0;
        }
        .service-description {
            background: #f1f8e9;
            border-left: 4px solid #43a047;
            padding: 15px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        .cta-section {
            text-align: center;
            margin: 30px 0;
        }
        .cta-button {
            display: inline-block;
            background: #025a62;
            color: white !important;
            padding: 15px 30px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
        }
        .cta-button:hover {
            background: #038c8c;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px 30px;
            text-align: center;
            font-size: 14px;
            color: #666;
            border-top: 1px solid #e9ecef;
        }
        .footer a {
            color: #025a62;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>QUOTATION</h1>
            <p>{{ $quotation->quotation_number }}</p>
        </div>
        
        <div class="content">
            <p class="greeting">Dear {{ $quotation->name ?? 'Valued Client' }},</p>
            
            <p>Thank you for your interest in our services. Please find below your quotation from RealNet Web Solutions.</p>
            
            <div class="quotation-box">
                <h3>Quotation Details</h3>
                <div class="quotation-detail">
                    <span class="label">Quotation Number</span>
                    <span class="value">{{ $quotation->quotation_number }}</span>
                </div>
                <div class="quotation-detail">
                    <span class="label">Issue Date</span>
                    <span class="value">{{ $quotation->issue_date?->format('d M Y') ?? date('d M Y') }}</span>
                </div>
                @if($quotation->expiry_date)
                <div class="quotation-detail">
                    <span class="label">Valid Until</span>
                    <span class="value">{{ $quotation->expiry_date->format('d M Y') }}</span>
                </div>
                @endif
                @if($quotation->service)
                <div class="quotation-detail">
                    <span class="label">Service</span>
                    <span class="value">{{ $quotation->service }}</span>
                </div>
                @endif
            </div>
            
            @if($quotation->project_description)
            <div class="service-description">
                <strong>Project Description:</strong>
                <p style="margin: 10px 0 0;">{{ $quotation->project_description }}</p>
            </div>
            @endif
            
            <div class="total-amount">
                <div class="label">Quotation Total</div>
                <div class="amount">R {{ number_format($quotation->total_amount ?? 0, 2) }}</div>
            </div>
            
            @if($quotation->expiry_date)
            <div class="validity-notice">
                <strong>📆 This quotation is valid until {{ $quotation->expiry_date->format('d M Y') }}</strong>
            </div>
            @endif
            
            @if($quotation->notes)
            <div style="margin: 20px 0;">
                <strong>Notes:</strong>
                <p>{{ $quotation->notes }}</p>
            </div>
            @endif
            
            <div class="cta-section">
                <p>Ready to get started? Reply to this email or contact us to proceed.</p>
            </div>
            
            <p>If you have any questions about this quotation, please don't hesitate to contact us.</p>
            
            <p style="margin-top: 30px;">
                Best regards,<br>
                <strong>RealNet Web Solutions</strong>
            </p>
        </div>
        
        <div class="footer">
            <p>&copy; {{ date('Y') }} RealNet Web Solutions. All rights reserved.</p>
            <p>
                <a href="mailto:lukhele@realnet-web.co.za">lukhele@realnet-web.co.za</a> | 
                <a href="tel:+27710020008">+27 71 002 0008</a> | 
                <a href="tel:+27640388883">+27 64 038 8883</a>
            </p>
            <p style="margin-top: 10px; font-size: 12px; color: #999;">
                Company Reg: 2024/487922/07
            </p>
        </div>
    </div>
</body>
</html>
