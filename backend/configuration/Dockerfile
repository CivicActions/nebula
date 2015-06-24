FROM php:5.6-fpm

RUN apt-get update && apt-get install libzip-dev zip

RUN docker-php-ext-install pdo pdo_mysql zip
