<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice {{ $invoice->invoice_number }}</title>
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
        .invoice-box {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #025a62;
        }
        .invoice-box h3 {
            margin: 0 0 15px;
            color: #025a62;
        }
        .invoice-detail {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .invoice-detail:last-child {
            border-bottom: none;
        }
        .invoice-detail .label {
            color: #666;
        }
        .invoice-detail .value {
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
        .cta-button {
            display: inline-block;
            background: #025a62;
            color: white !important;
            padding: 15px 30px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            margin: 20px 0;
        }
        .cta-button:hover {
            background: #038c8c;
        }
        .banking-details {
            background: #fff3cd;
            border: 1px solid #ffc107;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .banking-details h4 {
            margin: 0 0 15px;
            color: #856404;
        }
        .banking-details pre {
            margin: 0;
            white-space: pre-wrap;
            font-family: 'Consolas', monospace;
            font-size: 14px;
            color: #856404;
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
            <h1>INVOICE</h1>
            <p>{{ $invoice->invoice_number }}</p>
        </div>
        
        <div class="content">
            <p class="greeting">Dear {{ $invoice->name ?? 'Valued Client' }},</p>
            
            <p>Please find attached your invoice from RealNet Web Solutions. We appreciate your business!</p>
            
            <div class="invoice-box">
                <h3>Invoice Details</h3>
                <div class="invoice-detail">
                    <span class="label">Invoice Number</span>
                    <span class="value">{{ $invoice->invoice_number }}</span>
                </div>
                <div class="invoice-detail">
                    <span class="label">Issue Date</span>
                    <span class="value">{{ $invoice->issue_date?->format('d M Y') ?? 'N/A' }}</span>
                </div>
                <div class="invoice-detail">
                    <span class="label">Due Date</span>
                    <span class="value">{{ $invoice->due_date?->format('d M Y') ?? 'N/A' }}</span>
                </div>
                @if($invoice->company)
                <div class="invoice-detail">
                    <span class="label">Company</span>
                    <span class="value">{{ $invoice->company }}</span>
                </div>
                @endif
            </div>
            
            <div class="total-amount">
                <div class="label">Amount Due</div>
                <div class="amount">R {{ number_format($invoice->amount_due ?? $invoice->total_amount, 2) }}</div>
            </div>
            
            @if($invoice->banking_details)
            <div class="banking-details">
                <h4>Banking Details</h4>
                <pre>{{ $invoice->banking_details }}</pre>
            </div>
            @endif
            
            @if($invoice->notes)
            <div style="margin: 20px 0;">
                <strong>Notes:</strong>
                <p>{{ $invoice->notes }}</p>
            </div>
            @endif
            
            <p>If you have any questions about this invoice, please don't hesitate to contact us.</p>
            
            <p>Thank you for your business!</p>
            
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
