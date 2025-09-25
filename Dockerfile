FROM php:7.4-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libpq-dev \
    dnsutils \
    iputils-ping

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd opcache

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy existing application directory contents
COPY . /var/www

# Create necessary directories and set permissions
RUN mkdir -p /var/www/storage/logs /var/www/bootstrap/cache
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Change current user to www
USER www-data

# Expose port 8000 and start php-fpm server
EXPOSE 8000
CMD ["php", "-d", "memory_limit=512M", "-d", "max_execution_time=300", "-d", "default_socket_timeout=30", "-d", "opcache.enable=1", "-d", "opcache.memory_consumption=128", "-d", "curl.cainfo=", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]