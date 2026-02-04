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
php artisan storage:link

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
# Configure Apache to use writable directories
export APACHE_LOCK_DIR=/tmp/apache-lock
export APACHE_PID_FILE=/tmp/apache2.pid
export APACHE_RUN_DIR=/tmp/apache2
export APACHE_LOG_DIR=/tmp/apache2-logs

mkdir -p $APACHE_LOCK_DIR $APACHE_RUN_DIR $APACHE_LOG_DIR

exec apache2-foreground
