<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ResourcePostResource\Pages;
use App\Models\ResourcePost;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Builder;

class ResourcePostResource extends Resource
{
    protected static ?string $model = ResourcePost::class;

    protected static ?string $navigationIcon = 'heroicon-o-book-open';

    protected static ?string $navigationGroup = 'Article Posts';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Resource Information')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function ($state, $set) {
                                $set('slug', Str::slug($state));
                            }),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),
                        Forms\Components\Textarea::make('excerpt')
                            ->required()
                            ->rows(3)
                            ->maxLength(500),
                        Forms\Components\RichEditor::make('content')
                            ->required()
                            ->fileAttachmentsDirectory('resource-posts/images')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Media & Metadata')
                    ->schema([
                        Forms\Components\FileUpload::make('image')
                            ->label('Featured Image')
                            ->image()
                            ->disk('public')
                            ->directory('resource-posts/images')
                            ->preserveFilenames()
                            ->maxSize(2048)
                            ->imageResizeMode('cover')
                            ->imageCropAspectRatio('16:9')
                            ->imageResizeTargetWidth('800')
                            ->imageResizeTargetHeight('450'),
                        
                        Forms\Components\Select::make('category')
                            ->required()
                            ->options([
                                'Web Development' => 'Web Development',
                                'Mobile Apps' => 'Mobile Apps',
                                'Digital Marketing' => 'Digital Marketing',
                                'UI/UX Design' => 'UI/UX Design',
                                'Business Strategy' => 'Business Strategy',
                                'Technology' => 'Technology',
                            ]),
                        
                        Forms\Components\TextInput::make('author')
                            ->required()
                            ->default(\Illuminate\Support\Facades\Auth::user()?->name ?? '')
                            ->maxLength(255),
                        
                        Forms\Components\TextInput::make('read_time')
                            ->numeric()
                            ->minValue(1)
                            ->maxValue(60)
                            ->suffix('minutes')
                            ->default(5),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Tags & Settings')
                    ->schema([
                        Forms\Components\TagsInput::make('tags')
                            ->placeholder('Add a tag')
                            ->separator(',')
                            ->nestedRecursiveRules(['string', 'max:50']),
                        
                        Forms\Components\Toggle::make('is_featured')
                            ->label('Featured Resource')
                            ->default(false),
                        
                        Forms\Components\Toggle::make('is_published')
                            ->label('Published')
                            ->default(true),
                        
                        Forms\Components\DateTimePicker::make('published_at')
                            ->label('Publish Date')
                            ->default(now()),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('Image')
                    ->disk('public')
                    ->circular(),
                
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->limit(50),
                
                Tables\Columns\TextColumn::make('category')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'web-development' => 'success',
                        'mobile-apps' => 'info',
                        'digital-marketing' => 'warning',
                        'ui-ux-design' => 'primary',
                        'business-strategy' => 'danger',
                        'technology' => 'gray',
                        default => 'secondary',
                    })
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('author')
                    ->searchable()
                    ->sortable(),
                
                Tables\Columns\IconColumn::make('is_featured')
                    ->label('Featured')
                    ->boolean(),
                
                Tables\Columns\IconColumn::make('is_published')
                    ->label('Published')
                    ->boolean(),
                
                Tables\Columns\TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->options([
                        'web-development' => 'Web Development',
                        'mobile-apps' => 'Mobile Apps',
                        'digital-marketing' => 'Digital Marketing',
                        'ui-ux-design' => 'UI/UX Design',
                        'business-strategy' => 'Business Strategy',
                        'technology' => 'Technology',
                    ]),
                
                Tables\Filters\Filter::make('is_featured')
                    ->label('Featured Resources')
                    ->query(fn (Builder $query): Builder => $query->where('is_featured', true)),
                
                Tables\Filters\Filter::make('is_published')
                    ->label('Published Resources')
                    ->query(fn (Builder $query): Builder => $query->where('is_published', true)),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\ViewAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\BulkAction::make('publish')
                        ->label('Publish Selected')
                        ->action(fn ($records) => $records->each->update(['is_published' => true]))
                        ->requiresConfirmation(),
                    Tables\Actions\BulkAction::make('unpublish')
                        ->label('Unpublish Selected')
                        ->action(fn ($records) => $records->each->update(['is_published' => false]))
                        ->requiresConfirmation(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListResourcePosts::route('/'),
            'create' => Pages\CreateResourcePost::route('/create'),
            'edit' => Pages\EditResourcePost::route('/{record}/edit'),
        ];
    }
}
