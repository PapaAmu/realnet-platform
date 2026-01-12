<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quotation #{{ $quotation->quotation_number }}</title>
    <style>
        @page {
            size: A4;
            margin: 15mm;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #1a202c;
            line-height: 1.3;
            margin: 0;
            padding: 0;
            font-size: 12px;
            background: #f7fafc;
        }
        
        .container {
            max-width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            background: white;
            position: relative;
            padding: 20px;
        }
        
        /* Header with Logo */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 15px;
            margin-bottom: 15px;
        }
        
        .logo-section {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .logo {
            max-height: 60px;
            width: auto;
        }
        
        .company-info {
            flex: 1;
        }
        
        .company-name {
            font-size: 18px;
            font-weight: 700;
            color: #2d3748;
            margin: 0 0 3px 0;
        }
        
        .company-tagline {
            font-size: 11px;
            color: #718096;
            font-weight: 500;
            margin: 0 0 5px 0;
        }
        
        .company-details {
            font-size: 10px;
            color: #4a5568;
            line-height: 1.4;
        }
        
        .contact-item {
            display: inline-flex;
            align-items: center;
            gap: 3px;
            margin-right: 10px;
        }
        
        /* Quotation Header */
        .quotation-header {
            text-align: right;
        }
        
        .quotation-title {
            font-size: 24px;
            font-weight: 800;
            color: #2d3748;
            margin: 0 0 10px 0;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .quotation-details {
            background: #f8fafc;
            padding: 10px 15px;
            border-radius: 4px;
            border-left: 3px solid #025a62;
        }
        
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 4px;
        }
        
        /* Client Section */
        .client-section {
            background: #edf2f7;
            padding: 12px 15px;
            border-radius: 4px;
            margin-bottom: 15px;
            border: 1px solid #e2e8f0;
        }
        
        .section-heading {
            font-size: 13px;
            font-weight: 600;
            color: #2d3748;
            margin: 0 0 8px 0;
            padding-bottom: 4px;
            border-bottom: 1px solid #cbd5e0;
        }
        
        .client-details {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
        }
        
        .client-item strong {
            display: block;
            color: #2d3748;
            font-size: 11px;
        }
        
        /* Items Table */
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            font-size: 11px;
        }
        
        .items-table th {
            background: #025a62;
            color: white;
            padding: 8px 10px;
            font-weight: 600;
            border: none;
        }
        
        .items-table td {
            padding: 8px 10px;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .items-table tbody tr:hover {
            background: #f7fafc;
        }
        
        /* Totals */
        .totals-section {
            margin-left: auto;
            width: 220px;
            margin-bottom: 20px;
        }
        
        .total-row {
            display: flex;
            justify-content: space-between;
            padding: 6px 0;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .grand-total {
            font-weight: 700;
            font-size: 14px;
            color: #2d3748;
            border-top: 2px solid #025a62;
            margin-top: 6px;
            padding-top: 8px;
        }
        
        /* Footer Sections */
        .footer-sections {
            margin-top: 20px;
        }
        
        .footer-box {
            margin-bottom: 12px;
            padding: 10px 12px;
            border-radius: 4px;
            background: #f8fafc;
            border-left: 3px solid #025a62;
        }
        
        .footer-box h3 {
            font-size: 12px;
            font-weight: 600;
            color: #2d3748;
            margin: 0 0 6px 0;
        }
        
        .banking-details {
            background: #ebf8ff;
            border-left: 3px solid #025a62;
        }
        
        /* Signature & Footer */
        .bottom-section {
            position: absolute;
            bottom: 20px;
            left: 20px;
            right: 20px;
        }
        
        .signature-section {
            float: right;
            text-align: center;
            width: 160px;
        }
        
        .signature {
            max-width: 120px;
            height: auto;
            margin-bottom: 4px;
        }
        
        .signature-text {
            font-size: 10px;
            color: #4a5568;
            border-top: 1px dashed #cbd5e0;
            padding-top: 2px;
            margin-top: 2px;
        }
        
        .contact-footer {
            font-size: 10px;
            color: #718096;
            padding-top: 10px;
            border-top: 1px solid #e2e8f0;
            clear: both;
        }
        
        .footer-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .footer-notes {
            font-size: 9px;
            color: #a0aec0;
            margin-top: 4px;
        }
        
        /* Print Button */
        .print-btn {
            display: block;
            margin: 0 auto 15px auto;
            background: #025a62;
            color: white;
            border: none;
            padding: 8px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            font-size: 12px;
            transition: background 0.2s;
        }
        
        .print-btn:hover {
            background: #025a62;
        }
        
        /* Print Styles */
        @media print {
            body {
                background: white;
                padding: 0;
            }
            
            .container {
                max-width: 100%;
                min-height: auto;
                margin: 0;
                padding: 15mm;
                box-shadow: none;
            }
            
            .print-btn {
                display: none;
            }
        }
        
        /* Utility */
        .text-right {
            text-align: right;
        }
        
        .text-center {
            text-align: center;
        }
        
        .text-bold {
            font-weight: 600;
        }
        
        .text-blue {
            color: #025a62;
        }
        
        .mt-1 {
            margin-top: 4px;
        }
        
        .mb-1 {
            margin-bottom: 4px;
        }
    </style>
</head>
<body>
    <button onclick="window.print()" class="print-btn">Print / Download</button>
    
    <div class="container">
        <!-- Header with Logo -->
        <div class="header">
            <div class="logo-section">
                <img src="{{ asset('logo.png') }}" alt="REALNET Logo" class="logo">
                <div class="company-info">
                    <div class="company-name">REALNET WEB SOLUTIONS</div>
                    <div class="company-tagline">Empowering Business with Dignity & Digital Excellence</div>
                    <div class="company-details">
                        <div class="contact-item">
                            <span>📧</span>
                            <span>lukhele@realnet-web.co.za</span>
                        </div>
                        <div class="contact-item">
                            <span>📱</span>
                            <span>+27 71 002 0008</span>
                        </div>
                        <div class="contact-item">
                            <span>📞</span>
                            <span>+27 64 038 8883</span>
                        </div>
                        <div class="mt-1">
                            Company Reg: {{ $quotation->company_reg_number ?? '2024/487922/07' }}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="quotation-header">
                <div class="quotation-title">Quotation</div>
                <div class="quotation-details">
                    <div class="detail-row">
                        <span>Quotation #:</span>
                        <span class="text-bold">{{ $quotation->quotation_number }}</span>
                    </div>
                    <div class="detail-row">
                        <span>Date:</span>
                        <span>{{ $quotation->issue_date ? $quotation->issue_date->format('d M Y') : date('d M Y') }}</span>
                    </div>
                    <div class="detail-row">
                        <span>Valid Until:</span>
                        <span>{{ $quotation->expiry_date ? $quotation->expiry_date->format('d M Y') : date('d M Y', strtotime('+30 days')) }}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Client Information -->
        <div class="client-section">
            <div class="section-heading">Client Information</div>
            <div class="client-details">
                <div class="client-item">
                    <strong>Client</strong>
                    {{ $quotation->company ?? ($quotation->client ? $quotation->client->name : 'N/A') }}
                </div>
                <div class="client-item">
                    <strong>Contact Person</strong>
                    {{ $quotation->name }}
                </div>
                <div class="client-item">
                    <strong>Email</strong>
                    {{ $quotation->email }}
                </div>
                <div class="client-item">
                    <strong>Phone</strong>
                    {{ $quotation->phone }}
                </div>
                @php
                    $displayAddress = $quotation->address;
                    if (empty($displayAddress) && $quotation->client) {
                        $displayAddress = implode(', ', array_filter([
                            $quotation->client->address,
                            $quotation->client->city,
                            $quotation->client->state,
                            $quotation->client->zip,
                            $quotation->client->country
                        ]));
                    }
                @endphp
                @if($displayAddress)
                <div class="client-item" style="grid-column: span 2;">
                    <strong>Address</strong>
                    {{ $displayAddress }}
                </div>
                @endif
            </div>
        </div>
        
        <!-- Items Table -->
        <table class="items-table">
            <thead>
                <tr>
                    <th style="width: 50%; text-align: left;">Description</th>
                    <th style="width: 15%; text-align: center;">Qty</th>
                    <th style="width: 15%; text-align: right;">Unit Price</th>
                    <th style="width: 20%; text-align: right;">Amount</th>
                </tr>
            </thead>
            <tbody>
                @foreach($quotation->items as $item)
                <tr>
                    <td>{{ $item->description }}</td>
                    <td class="text-center">{{ $item->quantity }}</td>
                    <td class="text-right">R{{ number_format($item->unit_price, 2) }}</td>
                    <td class="text-right text-bold">R{{ number_format($item->amount, 2) }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
        
        <!-- Totals -->
        <div class="totals-section">
            <div class="total-row">
                <span>Subtotal:</span>
                <span>R{{ number_format($quotation->subtotal, 2) }}</span>
            </div>
            @if($quotation->tax_amount > 0)
            <div class="total-row">
                <span>Tax ({{ $quotation->tax_rate }}%):</span>
                <span>R{{ number_format($quotation->tax_amount, 2) }}</span>
            </div>
            @endif
            <div class="total-row grand-total">
                <span>TOTAL:</span>
                <span>R{{ number_format($quotation->total_amount, 2) }}</span>
            </div>
        </div>
        
        <!-- Footer Sections -->
        <div class="footer-sections">
            @if($quotation->notes)
            <div class="footer-box">
                <h3>Notes</h3>
                <p class="mb-1">{{ $quotation->notes }}</p>
            </div>
            @endif
            
            @if($quotation->terms)
            <div class="footer-box">
                <h3>Terms & Conditions</h3>
                <p class="mb-1">{!! nl2br(e($quotation->terms)) !!}</p>
            </div>
            @endif
            
            @if($quotation->banking_details)
            <div class="footer-box banking-details">
                <h3>Payment Information</h3>
                <div class="mb-1" style="font-weight: bold;">{!! nl2br(e($quotation->banking_details)) !!}</div>
            </div>
            @endif
        </div>
        
        <!-- Bottom Section -->
        <div class="bottom-section">
            <div class="signature-section">
                <img src="{{ asset('signature.png') }}" alt="Signature" class="signature">
                <div class="signature-text">
                    Mr TR Lukhele<br>
                    Founding Director
                </div>
            </div>
            
            <div class="contact-footer">
                <div class="footer-row">
                    <div>
                        Quotation #{{ $quotation->quotation_number }}
                    </div>
                    <div class="text-blue">
                        lukhele@realnet-web.co.za | +27 71 002 0008 | +27 64 038 8883
                    </div>
                </div>
                <div class="footer-notes">
                    This quotation is valid until {{ $quotation->expiry_date ? $quotation->expiry_date->format('d M Y') : date('d M Y', strtotime('+30 days')) }}
                </div>
            </div>
        </div>
    </div>
</body>
</html>