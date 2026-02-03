<!DOCTYPE html>
<html>
<head>
    <title>New Quotation Request</title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; color: #333; }
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
            <h2>New Quotation Request</h2>
            <p>A new lead has submitted a quotation request.</p>
        </div>
        
        <div class="details">
            <p><span class="label">Reference:</span> {{ $quotation->quotation_number }}</p>
            <p><span class="label">Client:</span> {{ $quotation->name }}</p>
            <p><span class="label">Email:</span> {{ $quotation->email }}</p>
            <p><span class="label">Phone:</span> {{ $quotation->phone }}</p>
            <p><span class="label">Company:</span> {{ $quotation->company ?? 'N/A' }}</p>
            <p><span class="label">Service:</span> {{ $quotation->service }}</p>
            <p><span class="label">Budget:</span> {{ $quotation->budget }}</p>
            <p><span class="label">Timeline:</span> {{ $quotation->timeline }}</p>
        </div>
        
        <h3>Project Description</h3>
        <p>{{ $quotation->project_description }}</p>
        
        @if($quotation->additional_details)
        <h3>Additional Details</h3>
        <p>{{ $quotation->additional_details }}</p>
        @endif
        
        <a href="{{ route('filament.admin.resources.quotations.edit', $quotation) }}" class="btn">View & Manage in Admin Panel</a>
    </div>
</body>
</html>
