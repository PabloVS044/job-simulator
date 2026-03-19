FROM php:8.2-cli

WORKDIR /app

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY composer*.json ./
RUN composer install --no-dev --optimize-autoloader

COPY . .

EXPOSE 8000

CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
