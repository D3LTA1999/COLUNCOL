FROM php:7.2.2-apache
COPY php/ /var/www/html
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
