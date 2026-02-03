#!/bin/sh
set -e

# Run migrations
echo "Running migrations..."
php artisan migrate --force

# Optimization commands
echo "Running optimizations..."
php artisan optimize:clear
php artisan optimize
php artisan event:cache
php artisan filament:optimize

# Cache configuration, events, routes, and views
if [ "$APP_ENV" != "local" ]; then
    echo "Caching configuration..."
    php artisan config:cache
    php artisan event:cache
    php artisan route:cache
    php artisan view:cache
fi

# Start Apache
echo "Starting Apache..."
exec apache2-foreground
