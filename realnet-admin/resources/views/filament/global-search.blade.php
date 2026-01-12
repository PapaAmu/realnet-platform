<div class="p-4">
    @foreach($results as $section => $items)
        @if(count($items) > 0)
            <div class="mb-6">
                <h3 class="text-xs font-bold tracking-wider text-gray-500 uppercase">{{ $section }}</h3>
                <div class="mt-2 space-y-1">
                    @foreach($items as $item)
                        <a href="{{ $item['url'] }}" class="flex items-center p-2 -mx-2 space-x-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
                            @if(isset($item['icon']))
                                <x-dynamic-component :component="$item['icon']" class="w-5 h-5 text-gray-400" />
                            @endif
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {!! $item['title'] !!}
                                </p>
                                @if(isset($item['description']))
                                    <p class="text-xs text-gray-500 truncate dark:text-gray-400">
                                        {!! $item['description'] !!}
                                    </p>
                                @endif
                            </div>
                        </a>
                    @endforeach
                </div>
            </div>
        @endif
    @endforeach

    @if(empty($results) || (count($results) === 1 && empty($results[array_key_first($results)])))
        <div class="text-center py-4 text-gray-500">
            No results found for "{{ $query }}"
        </div>
    @endif
</div>

@push('scripts')
    <script>
        document.addEventListener('livewire:initialized', () => {
            Livewire.on('openGlobalSearchResults', (results) => {
                // This event can be used to handle the search results if needed
                console.log('Global search results:', results);
            });
        });
    </script>
@endpush
