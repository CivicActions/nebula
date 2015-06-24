FROM php:5.6-fpm

RUN apt-get -y update && apt-get -y install libzip-dev unzip

RUN docker-php-ext-install pdo pdo_mysql zip
