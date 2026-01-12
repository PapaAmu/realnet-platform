# 💰 Advanced Quotation System

## Overview
The Advanced Quotation System allows you to create professional, itemized quotations with automatic calculations, client integration, and PDF-ready printable documents.

## ✨ Features

### 1. Professional Quotations
- **Auto-Generated Numbers**: Unique quotation numbers (e.g., QT-2025-0001)
- **Line Items**: Add multiple items with descriptions, quantities, and unit prices
- **Live Calculations**: Automatic subtotal, tax, and total calculations
- **Client Integration**: Link to clients with auto-filled contact details
- **Status Tracking**: Draft → Sent → Accepted → Rejected → Invoiced

### 2. Document Generation
- **Print/PDF Ready**: Professional print view with company branding
- **Company Logo**: Automatically displays your logo if available
- **Banking Details**: Included for easy payment processing
- **Terms & Conditions**: Customizable legal terms
- **Client Notes**: Special instructions or notes for the client

### 3. Financial Features
- **Currency**: South African Rand (R)
- **Tax Calculation**: Configurable tax rate with automatic calculation
- **Real-time Totals**: Updates as you add or modify items

## 🚀 How to Use

### Creating a Quotation

1. **Navigate to Quotations**
   - Go to **Sales → Quotations**
   - Click **New Quotation**

2. **Fill in Details**
   - **Quotation Number**: Auto-generated
   - **Client**: Select an existing client (optional but recommended)
   - **Status**: Choose status (default: Draft)
   - **Issue Date**: Date quotation was created
   - **Expiry Date**: Validity period (default: 30 days)

3. **Client Information**
   - If you selected a client, details auto-fill
   - Otherwise, manually enter Name, Email, Phone, Company

4. **Add Line Items**
   - Click **Add item**
   - Enter **Description** (e.g., "Website Development")
   - Enter **Quantity** (default: 1)
   - Enter **Unit Price** (in Rands)
   - **Amount** calculates automatically

5. **Set Tax & Review Totals**
   - Enter **Tax Rate** (%)
   - **Subtotal**, **Tax Amount**, and **Grand Total** calculate automatically

6. **Add Terms & Banking Details**
   - **Notes**: Special instructions for the client
   - **Terms & Conditions**: Default terms are pre-filled
   - **Banking Details**: Default bank account details are pre-filled
   - Customize as needed

7. **Save**
   - Click **Create** to save the quotation

### Generating PDF

1. **From Quotations Table**
   - Find your quotation in the list
   - Click the **Printer Icon** (Print / PDF)

2. **Print View Opens**
   - Professional quotation with:
     - Company logo (if `public/logo.png` exists)
     - Company details
     - Client details
     - Itemized list
     - Totals breakdown
     - Terms & conditions
     - Banking details

3. **Save as PDF**
   - Click **Print / Save as PDF** button
   - Or use **Ctrl+P** / **Cmd+P**
   - Choose "Save as PDF" from printer options

### Status Workflow

- **Draft**: Quotation is being prepared
- **Sent**: Quotation sent to client
- **Accepted**: Client accepted the quotation
- **Rejected**: Client declined
- **Invoiced**: Converted to an invoice (ready for billing)

## 🔧 Configuration

### Company Logo
- Place your logo at `public/logo.png`
- Recommended size: 300x100px (or similar aspect ratio)
- Supported formats: PNG (with transparency recommended)

### Banking Details
- Default banking details are pre-filled in the form
- Edit in the **Banking Details** field when creating/editing quotations
- Displayed prominently on the printed quotation

### Tax Rate
- Set per quotation
- Common VAT rate in South Africa: 15%
- Default: 0% (must be entered manually)

## 📊 Reports & Tracking

### Filtering
- Filter quotations by **Status**
- Sort by date, amount, or client

### Bulk Actions
- Delete multiple quotations at once

## 🔒 Security
- Only authenticated admin users can access quotations
- Client details are encrypted if using the Client model
- Banking details are stored securely in the database

## 💡 Tips

1. **Accurate Line Items**: Be detailed in descriptions for clarity
2. **Regular Updates**: Update status as you communicate with clients
3. **Professional Terms**: Customize default terms to match your business policies
4. **Follow Up**: Use the "Sent" status to track pending quotations
5. **Convert to Invoice**: Once accepted, change status to "Invoiced"

## 🐛 Troubleshooting

### SQL Error: Field doesn't have a default value
- **Fixed**: Legacy fields like `service` are now nullable
- All new quotations should work without errors

### Logo Not Showing
- Ensure `public/logo.png` exists
- Check file permissions
- Alternative: Use a different path and update the view

### Calculations Not Working
- Ensure **Quantity** and **Unit Price** are numeric
- Tax rate should be a percentage (e.g., 15 for 15%)

## 📅 Next Steps

Consider these future enhancements:
1. **Email Integration**: Send quotations directly to clients via email
2. **Invoice Conversion**: Auto-create invoices from accepted quotations
3. **Payment Tracking**: Track deposits and final payments
4. **Templates**: Save common quotation setups as templates
5. **Multi-Currency**: Support for USD, EUR, etc.

---

**Need Help?** Contact support@realnet.co.zw
