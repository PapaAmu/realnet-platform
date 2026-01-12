<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Confirmation - {{ $payment->payment_number }}</title>
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
            background: linear-gradient(135deg, #2e7d32 0%, #43a047 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .success-icon {
            font-size: 48px;
            margin-bottom: 10px;
        }
        .content {
            padding: 30px;
        }
        .greeting {
            font-size: 18px;
            color: #2e7d32;
            margin-bottom: 20px;
        }
        .payment-box {
            background: #e8f5e9;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #43a047;
        }
        .payment-box h3 {
            margin: 0 0 15px;
            color: #2e7d32;
        }
        .payment-detail {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #c8e6c9;
        }
        .payment-detail:last-child {
            border-bottom: none;
        }
        .payment-detail .label {
            color: #388e3c;
        }
        .payment-detail .value {
            font-weight: 600;
            color: #1b5e20;
        }
        .amount-paid {
            background: #43a047;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
        }
        .amount-paid .label {
            font-size: 14px;
            opacity: 0.9;
        }
        .amount-paid .amount {
            font-size: 32px;
            font-weight: 700;
            margin-top: 5px;
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
            <div class="success-icon">✓</div>
            <h1>Payment Received</h1>
            <p>Thank you for your payment!</p>
        </div>
        
        <div class="content">
            <p class="greeting">Dear {{ $payment->invoice?->name ?? $payment->client?->name ?? 'Valued Client' }},</p>
            
            <p>We have received your payment. Thank you for your business!</p>
            
            <div class="amount-paid">
                <div class="label">Amount Received</div>
                <div class="amount">R {{ number_format($payment->amount, 2) }}</div>
            </div>
            
            <div class="payment-box">
                <h3>Payment Details</h3>
                <div class="payment-detail">
                    <span class="label">Payment Reference</span>
                    <span class="value">{{ $payment->payment_number }}</span>
                </div>
                <div class="payment-detail">
                    <span class="label">Date</span>
                    <span class="value">{{ $payment->payment_date?->format('d M Y') ?? date('d M Y') }}</span>
                </div>
                <div class="payment-detail">
                    <span class="label">Payment Method</span>
                    <span class="value">{{ ucfirst(str_replace('_', ' ', $payment->payment_method ?? 'Not specified')) }}</span>
                </div>
                @if($payment->invoice)
                <div class="payment-detail">
                    <span class="label">Invoice</span>
                    <span class="value">{{ $payment->invoice->invoice_number }}</span>
                </div>
                @endif
                @if($payment->transaction_reference)
                <div class="payment-detail">
                    <span class="label">Transaction Reference</span>
                    <span class="value">{{ $payment->transaction_reference }}</span>
                </div>
                @endif
            </div>
            
            <p>This email serves as confirmation of your payment. Please keep this for your records.</p>
            
            <p>If you have any questions, please don't hesitate to contact us.</p>
            
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
