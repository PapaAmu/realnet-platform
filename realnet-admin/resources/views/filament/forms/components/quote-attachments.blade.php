{{-- resources/views/filament/forms/components/quote-attachments.blade.php --}}

<div class="space-y-4">
    <h3 class="text-lg font-medium">Attached Files</h3>
    
    <div class="grid gap-3">
        @foreach($getRecord()->attachments ?? [] as $attachment)
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div class="flex items-center space-x-3">
                    <div class="p-2 bg-white rounded border">
                        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    </div>
                    <div>
                        <div class="font-medium text-sm">{{ $attachment['name'] }}</div>
                        <div class="text-xs text-gray-500">
                            {{ number_format($attachment['size'] / 1024 / 1024, 2) }} MB • 
                            {{ \Carbon\Carbon::parse($attachment['uploaded_at'])->format('M j, Y g:i A') }}
                        </div>
                    </div>
                </div>
                <div>
                    <a href="{{ Storage::disk('public')->url($attachment['path']) }}" 
                       target="_blank" 
                       class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors">
                        Download
                    </a>
                </div>
            </div>
        @endforeach
    </div>
</div>