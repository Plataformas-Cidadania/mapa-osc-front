#!/bin/sh
# Install React dependencies
npm cache clean --force
npm install
# run composer
composer install
php artisan key:generate
php artisan config:clear
php artisan migrate
npx babel --watch resources/js/components --out-dir public/js/components --presets @babel/preset-react && npm run watch & php -S 0.0.0.0:8000 -t public/