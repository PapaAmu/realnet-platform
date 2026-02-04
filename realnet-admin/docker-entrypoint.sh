#!/bin/sh
set -e

# Verify we are running as root
if [ "$(id -u)" != "0" ]; then
    echo "Error: Container must run as root (UID 0). Current UID: $(id -u)"
    echo "Please ensure 'user:' directive is removed from docker-compose.yml"
    exit 1
fi

# Fix permissions for storage and cache (since we start as root)
echo "Fixing permissions..."
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
mkdir -p /tmp/apache-lock /tmp/apache2-logs /tmp/apache2
chown -R www-data:www-data /tmp/apache-lock /tmp/apache2-logs /tmp/apache2

# Run migrations
echo "Running migrations..."
su -s /bin/sh www-data -c "php artisan migrate --force"

# Optimization commands
echo "Running optimizations..."
su -s /bin/sh www-data -c "php artisan optimize:clear"
su -s /bin/sh www-data -c "php artisan optimize"
su -s /bin/sh www-data -c "php artisan event:cache"
su -s /bin/sh www-data -c "php artisan filament:optimize"

# Cache configuration, events, routes, and views
if [ "$APP_ENV" != "local" ]; then
    echo "Caching configuration..."
    su -s /bin/sh www-data -c "php artisan config:cache"
    su -s /bin/sh www-data -c "php artisan event:cache"
    su -s /bin/sh www-data -c "php artisan route:cache"
    su -s /bin/sh www-data -c "php artisan view:cache"
fi

# Start Apache
echo "Starting Apache..."
# Configure Apache to use writable directories
export APACHE_LOCK_DIR=/tmp/apache-lock
export APACHE_PID_FILE=/tmp/apache2.pid
export APACHE_RUN_DIR=/tmp/apache2
export APACHE_LOG_DIR=/tmp/apache2-logs

mkdir -p $APACHE_LOCK_DIR $APACHE_RUN_DIR $APACHE_LOG_DIR

echo "Switching to user www-data..."
exec gosu www-data apache2-foreground
