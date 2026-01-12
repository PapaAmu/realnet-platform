<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Receipt #{{ $payment->payment_number }}</title>
    <style>
        @page { size: A4; margin: 15mm; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1a202c; line-height: 1.3; margin: 0; padding: 0; font-size: 12px; background: #f7fafc; }
        .container { max-width: 210mm; min-height: 297mm; margin: 0 auto; background: white; position: relative; padding: 20px; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 15px; }
        .logo-section { display: flex; align-items: center; gap: 15px; }
        .logo { max-height: 60px; width: auto; }
        .company-info { flex: 1; }
        .company-name { font-size: 18px; font-weight: 700; color: #2d3748; margin: 0 0 3px 0; }
        .company-tagline { font-size: 11px; color: #718096; font-weight: 500; margin: 0 0 5px 0; }
        .company-details { font-size: 10px; color: #4a5568; line-height: 1.4; }
        .contact-item { display: inline-flex; align-items: center; gap: 3px; margin-right: 10px; }
        .receipt-header { text-align: right; }
        .receipt-title { font-size: 24px; font-weight: 800; color: #2d3748; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px; }
        .receipt-details { background: #f8fafc; padding: 10px 15px; border-radius: 4px; border-left: 3px solid #43a047; }
        .detail-row { display: flex; justify-content: space-between; margin-bottom: 4px; }
        .section { margin-bottom: 15px; }
        .section h3 { font-size: 13px; font-weight: 600; color: #2d3748; margin: 0 0 8px 0; border-bottom: 1px solid #cbd5e0; padding-bottom: 4px; }
        .info-table { width: 100%; border-collapse: collapse; }
        .info-table td { padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
        .info-table td:first-child { font-weight: 600; color: #4a5568; width: 40%; }
        .info-table td:last-child { color: #2d3748; }
        .amount-highlight { background: #e8f5e9; padding: 15px; border-radius: 8px; border-left: 4px solid #43a047; margin: 20px 0; }
        .amount-highlight .label { font-size: 11px; color: #2e7d32; font-weight: 600; margin-bottom: 5px; }
        .amount-highlight .amount { font-size: 24px; font-weight: 700; color: #1b5e20; }
        .banking-details { background: #ebf8ff; border-left: 3px solid #025a62; padding: 10px 12px; margin-top: 10px; border-radius: 4px; }
        .banking-details h3 { margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #2d3748; }
        .print-btn { display: block; margin: 0 auto 15px auto; background: #025a62; color: white; border: none; padding: 8px 20px; border-radius: 4px; cursor: pointer; font-weight: 500; font-size: 12px; }
        .print-btn:hover { background: #038c8c; }
        .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 10px; color: #718096; }
        .text-bold { font-weight: 600; }
        .text-success { color: #43a047; }
        .mt-1 { margin-top: 4px; }
        @media print { body { background: white; padding: 0; } .container { max-width: 100%; min-height: auto; margin: 0; padding: 15mm; box-shadow: none; } .print-btn { display: none; } }
    </style>
</head>
<body>
    <button onclick="window.print()" class="print-btn">Print / Save as PDF</button>
    <div class="container">
        <div class="header">
            <div class="logo-section">
                <img src="{{ asset('logo.png') }}" alt="REALNET Logo" class="logo">
                <div class="company-info">
                    <div class="company-name">REALNET WEB SOLUTIONS</div>
                    <div class="company-tagline">Empowering Business with Dignity & Digital Excellence</div>
                    <div class="company-details">
                        <div class="contact-item">📧 lukhele@realnet-web.co.za</div>
                        <div class="contact-item">📱 +27 71 002 0008</div>
                        <div class="contact-item">📞 +27 64 038 8883</div>
                        <div class="mt-1">Company Reg: 2024/487922/07</div>
                    </div>
                </div>
            </div>
            <div class="receipt-header">
                <div class="receipt-title">PAYMENT RECEIPT</div>
                <div class="receipt-details">
                    <div class="detail-row">
                        <span>Receipt #:</span>
                        <span class="text-bold">{{ $payment->payment_number }}</span>
                    </div>
                    <div class="detail-row">
                        <span>Date:</span>
                        <span>{{ $payment->payment_date ? $payment->payment_date->format('d M Y') : date('d M Y') }}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="amount-highlight">
            <div class="label">Amount Received</div>
            <div class="amount">R{{ number_format($payment->amount, 2) }}</div>
        </div>
        
        <div class="section">
            <h3>Payment Details</h3>
            <table class="info-table">
                <tr>
                    <td>Invoice #:</td>
                    <td>{{ $payment->invoice->invoice_number ?? 'N/A' }}</td>
                </tr>
                <tr>
                    <td>Client:</td>
                    <td>{{ $payment->client->name ?? $payment->invoice->client->name ?? $payment->invoice->company ?? 'N/A' }}</td>
                </tr>
                <tr>
                    <td>Payment Method:</td>
                    <td>{{ ucfirst(str_replace('_', ' ', $payment->payment_method)) }}</td>
                </tr>
                @if($payment->transaction_reference)
                <tr>
                    <td>Transaction Reference:</td>
                    <td>{{ $payment->transaction_reference }}</td>
                </tr>
                @endif
                @if($payment->notes)
                <tr>
                    <td>Notes:</td>
                    <td>{{ $payment->notes }}</td>
                </tr>
                @endif
            </table>
        </div>
        
        @if($payment->invoice && $payment->invoice->banking_details)
        <div class="banking-details">
            <h3>Banking Details</h3>
            <div style="font-size: 10px; line-height: 1.6;">{!! nl2br(e($payment->invoice->banking_details)) !!}</div>
        </div>
        @endif
        
        <div class="footer">
            <div style="margin-bottom: 5px;">
                <strong>Receipt #{{ $payment->payment_number }}</strong>
            </div>
            <div>
                lukhele@realnet-web.co.za | +27 71 002 0008 | +27 64 038 8883
            </div>
            <div style="margin-top: 10px; font-size: 9px; color: #a0aec0;">
                This receipt serves as confirmation of payment. Please keep for your records.
            </div>
        </div>
    </div>
</body>
</html>
